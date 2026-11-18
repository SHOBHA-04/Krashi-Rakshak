import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === "production";

const SYSTEM_INSTRUCTION =
  "You are an expert agricultural plant pathologist helping Indian farmers. Analyze the leaf image. If the image is not a plant leaf or is too blurry, say so instead of guessing. Use simple, farmer-friendly language. Focus especially on crops like Tomato, Potato, Apple, Corn, Grape, Pepper, Strawberry, Peach, Cherry, and Soybean, while still accurately diagnosing other clearly visible crop leaves. For treatment steps, always mention organic and cultural options first (such as removing infected leaves, neem oil, Trichoderma, or copper-based organic sprays) and then chemical options (such as Mancozeb or Azoxystrobin) with a clear note to follow the product label dosage. Populate both English fields and simple Devanagari Hindi fields (*_hi and summary_hindi) so farmers can switch languages seamlessly.";

const ANALYSIS_PROMPT = `Examine this uploaded photo carefully.
1. First verify whether this clearly shows a plant leaf. If it is not a plant leaf (e.g., human, object, soil only, blank screen) or is too blurry/dark to examine spots and veins reliably, set status to "Unclear", confidence below 45, severity to "Low", disease_name to "Unclear Leaf Image", and explain clearly in summary_english and summary_hindi why a clearer photo is needed.
2. If it is a clear leaf image, identify the crop (crop_name), whether it is "Healthy" or "Diseased", the specific disease_name (or "Healthy Leaf" if healthy), confidence (0-100 number), and severity ("Low", "Medium", or "High" — use "Low" for Healthy leaves).
3. List 2 to 4 short, clear symptoms_observed, 3 to 5 practical treatment steps (organic methods first, then chemical options like Mancozeb with label dosage note; for Healthy leaves give routine care tips), 2 to 4 prevention_tips, a concise affected_area_description, and 2-3 simple sentences in both summary_english and summary_hindi.
4. Provide natural Devanagari Hindi translations in crop_name_hi, disease_name_hi, symptoms_observed_hi, treatment_hi, prevention_tips_hi, and affected_area_description_hi.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    crop_name: { type: Type.STRING, description: "Identified crop name in English, e.g., Tomato" },
    crop_name_hi: { type: Type.STRING, description: "Identified crop name in Devanagari Hindi, e.g., टमाटर" },
    status: {
      type: Type.STRING,
      enum: ["Healthy", "Diseased", "Unclear"],
      description: "Overall diagnosis status",
    },
    disease_name: { type: Type.STRING, description: "Disease name in English, or Healthy Leaf / Unclear Image" },
    disease_name_hi: { type: Type.STRING, description: "Disease name in Devanagari Hindi" },
    confidence: { type: Type.NUMBER, description: "Model confidence percentage from 0 to 100" },
    severity: {
      type: Type.STRING,
      enum: ["Low", "Medium", "High"],
      description: "Severity level of the disease",
    },
    symptoms_observed: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Short visual symptoms observed on the leaf in English",
    },
    symptoms_observed_hi: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Short visual symptoms observed on the leaf in Devanagari Hindi",
    },
    treatment: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable treatment steps in English, organic options first then chemical with label dosage note",
    },
    treatment_hi: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Actionable treatment steps in Devanagari Hindi, organic first then chemical with label dosage note",
    },
    prevention_tips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Short prevention tips in English",
    },
    prevention_tips_hi: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Short prevention tips in Devanagari Hindi",
    },
    affected_area_description: {
      type: Type.STRING,
      description: "Short description of which part of the leaf is affected in English",
    },
    affected_area_description_hi: {
      type: Type.STRING,
      description: "Short description of which part of the leaf is affected in Devanagari Hindi",
    },
    summary_hindi: { type: Type.STRING, description: "2-3 simple farmer-friendly sentences in Devanagari Hindi" },
    summary_english: { type: Type.STRING, description: "2-3 simple farmer-friendly sentences in English" },
  },
  required: [
    "crop_name",
    "crop_name_hi",
    "status",
    "disease_name",
    "disease_name_hi",
    "confidence",
    "severity",
    "symptoms_observed",
    "symptoms_observed_hi",
    "treatment",
    "treatment_hi",
    "prevention_tips",
    "prevention_tips_hi",
    "affected_area_description",
    "affected_area_description_hi",
    "summary_hindi",
    "summary_english",
  ],
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function generateWithRetry(ai: GoogleGenAI, imageBase64: string, mimeType: string) {
  const maxAttempts = 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-4-hydrogen",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: imageBase64,
              },
            },
            {
              text: ANALYSIS_PROMPT,
            },
          ],
        },
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
        },
      });
      return response;
    } catch (err: unknown) {
      lastError = err;
      const errMsg = err instanceof Error ? err.message : String(err);
      const isNonRetryable =
        errMsg.includes("API_KEY_INVALID") ||
        errMsg.includes("PERMISSION_DENIED") ||
        errMsg.includes("INVALID_ARGUMENT") ||
        errMsg.includes("400") ||
        errMsg.includes("403");

      if (isNonRetryable || attempt === maxAttempts) {
        throw err;
      }
      await sleep(500 * Math.pow(2, attempt - 1));
    }
  }

  throw lastError;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "8mb" }));

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.post("/api/analyze-leaf", async (req: Request, res: Response) => {
    try {
      const { imageBase64, mimeType } = req.body as {
        imageBase64?: string;
        mimeType?: string;
      };

      if (!imageBase64 || typeof imageBase64 !== "string") {
        res.status(400).json({
          error: "INVALID_IMAGE",
          message: "Please upload a valid leaf image.",
        });
        return;
      }

      const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
      const safeMimeType =
        mimeType && allowedMimeTypes.includes(mimeType) ? mimeType : "image/jpeg";

      // Guard decoded size (~5 MB max)
      const approxBytes = Math.ceil((imageBase64.length * 3) / 4);
      if (approxBytes > 5 * 1024 * 1024) {
        res.status(400).json({
          error: "FILE_TOO_LARGE",
          message: "Image size exceeds 5 MB limit after compression.",
        });
        return;
      }

      const ai = getGeminiClient();
      if (!ai) {
        res.status(503).json({
          error: "GEMINI_API_KEY_MISSING",
          message:
            "Gemini API key is not configured on the server. Please add GEMINI_API_KEY in Settings > Secrets.",
        });
        return;
      }

      const response = await generateWithRetry(ai, imageBase64, safeMimeType);
      const rawText = (response.text ?? "").trim();

      if (!rawText) {
        res.status(502).json({
          error: "EMPTY_MODEL_RESPONSE",
          message: "The AI model returned an empty response. Please try again.",
        });
        return;
      }

      const parsed = JSON.parse(rawText) as Record<string, unknown>;

      // Normalize confidence to 0-100 with 1 decimal place
      let confidence = Number(parsed.confidence);
      if (!Number.isFinite(confidence)) {
        confidence = 0;
      } else if (confidence > 0 && confidence <= 1) {
        confidence = Math.round(confidence * 1000) / 10;
      } else {
        confidence = Math.min(100, Math.max(0, Math.round(confidence * 10) / 10));
      }

      res.json({
        ...parsed,
        confidence,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown analysis error";
      console.error("Leaf analysis error:", message);

      if (message.includes("API_KEY_INVALID") || message.includes("PERMISSION_DENIED")) {
        res.status(403).json({
          error: "API_AUTH_ERROR",
          message: "Gemini API key is invalid or unauthorized. Please check Settings > Secrets.",
        });
        return;
      }

      if (message.includes("RESOURCE_EXHAUSTED") || message.includes("429")) {
        res.status(429).json({
          error: "RATE_LIMITED",
          message: "Too many requests right now. Please wait a few seconds and try again.",
        });
        return;
      }

      res.status(500).json({
        error: "ANALYSIS_FAILED",
        message: "Could not complete leaf analysis. Please check your connection and retry.",
      });
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("/{*splat}", (_req: Request, res: Response) => {
      const indexFile = path.join(distPath, "index.html");
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send("Build artifacts not found.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FasalVaidya server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
