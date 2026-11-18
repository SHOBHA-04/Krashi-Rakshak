import { jsPDF } from "jspdf";
import type { Language, PlantAnalysisResult } from "../types/plant";
import { TRANSLATIONS } from "../i18n/translations";

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function renderReportCanvas(
  result: PlantAnalysisResult,
  imageSrc: string,
  lang: Language,
  timestamp: number
): Promise<HTMLCanvasElement> {
  const t = TRANSLATIONS[lang];
  const width = 1000;
  const padding = 56;
  const contentWidth = width - padding * 2;

  const crop = lang === "hi" && result.crop_name_hi ? result.crop_name_hi : result.crop_name;
  const disease =
    lang === "hi" && result.disease_name_hi ? result.disease_name_hi : result.disease_name;
  const summary = lang === "hi" ? result.summary_hindi : result.summary_english;
  const treatments =
    lang === "hi" && result.treatment_hi?.length ? result.treatment_hi : result.treatment;
  const symptoms =
    lang === "hi" && result.symptoms_observed_hi?.length
      ? result.symptoms_observed_hi
      : result.symptoms_observed;

  // Measure height dynamically with a scratch canvas
  const scratch = document.createElement("canvas");
  scratch.width = width;
  scratch.height = 1800;
  const sctx = scratch.getContext("2d")!;
  sctx.font = '400 22px "Manrope", "Noto Sans Devanagari", sans-serif';

  // Estimate total height conservatively and crop cleanly if needed
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = 1480;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = "#F7F7F2";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Header band
  ctx.fillStyle = "#2E7D32";
  ctx.fillRect(0, 0, canvas.width, 132);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = '700 34px "Bricolage Grotesque", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(t.appName, padding, 62);

  ctx.fillStyle = "#DCEDC8";
  ctx.font = '500 20px "Manrope", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(t.tagline, padding, 98);

  const dateText = new Date(timestamp).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  ctx.textAlign = "right";
  ctx.fillStyle = "#FFFFFF";
  ctx.font = '500 20px "Manrope", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(dateText, width - padding, 76);
  ctx.textAlign = "left";

  // Top summary card
  let y = 164;
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(padding, y, contentWidth, 250, 20);
  ctx.fill();
  ctx.strokeStyle = "#E2E6DC";
  ctx.lineWidth = 2;
  ctx.stroke();

  const img = await loadImage(imageSrc);
  const thumbX = padding + 24;
  const thumbY = y + 24;
  const thumbSize = 202;
  if (img) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(thumbX, thumbY, thumbSize, thumbSize, 14);
    ctx.clip();
    const scale = Math.max(thumbSize / img.width, thumbSize / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    ctx.drawImage(
      img,
      thumbX + (thumbSize - drawW) / 2,
      thumbY + (thumbSize - drawH) / 2,
      drawW,
      drawH
    );
    ctx.restore();
  }

  const infoX = thumbX + thumbSize + 28;
  const infoWidth = contentWidth - thumbSize - 76;

  ctx.fillStyle = "#526054";
  ctx.font = '600 20px "Manrope", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(`${t.cropLabel}: ${crop}`, infoX, thumbY + 32);

  ctx.fillStyle = "#162218";
  ctx.font = '700 32px "Bricolage Grotesque", "Noto Sans Devanagari", sans-serif';
  let textY = wrapText(ctx, disease, infoX, thumbY + 76, infoWidth, 38);

  const severityColor =
    result.status === "Healthy"
      ? "#2E7D32"
      : result.severity === "High"
        ? "#C62828"
        : "#D97706";
  const severityText =
    result.status === "Healthy"
      ? t.statusHealthy
      : result.severity === "High"
        ? t.severityHigh
        : result.severity === "Medium"
          ? t.severityMedium
          : t.severityLow;

  ctx.fillStyle = severityColor;
  ctx.font = '700 22px "Manrope", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(
    `${severityText}  ·  ${t.confidenceLabel}: ${result.confidence.toFixed(1)}%`,
    infoX,
    Math.min(textY + 26, thumbY + 188)
  );

  y += 280;

  // Summary block
  ctx.fillStyle = "#162218";
  ctx.font = '700 24px "Bricolage Grotesque", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(t.summaryTitle, padding, y + 18);
  y += 48;

  ctx.fillStyle = "#2E3A30";
  ctx.font = '400 21px "Manrope", "Noto Sans Devanagari", sans-serif';
  y = wrapText(ctx, summary, padding, y, contentWidth, 30);
  y += 24;

  // Symptoms
  if (symptoms.length > 0) {
    ctx.fillStyle = "#162218";
    ctx.font = '700 24px "Bricolage Grotesque", "Noto Sans Devanagari", sans-serif';
    ctx.fillText(t.symptomsTitle, padding, y + 10);
    y += 40;

    ctx.fillStyle = "#2E3A30";
    ctx.font = '400 20px "Manrope", "Noto Sans Devanagari", sans-serif';
    for (const sym of symptoms.slice(0, 4)) {
      y = wrapText(ctx, `• ${sym}`, padding + 8, y, contentWidth - 16, 28);
      y += 6;
    }
    y += 18;
  }

  // Treatment
  if (treatments.length > 0) {
    ctx.fillStyle = "#162218";
    ctx.font = '700 24px "Bricolage Grotesque", "Noto Sans Devanagari", sans-serif';
    ctx.fillText(t.treatmentTitle, padding, y + 10);
    y += 40;

    ctx.fillStyle = "#2E3A30";
    ctx.font = '400 20px "Manrope", "Noto Sans Devanagari", sans-serif';
    for (let i = 0; i < Math.min(treatments.length, 4); i++) {
      y = wrapText(ctx, `${i + 1}. ${treatments[i]}`, padding + 8, y, contentWidth - 16, 28);
      y += 8;
    }
    y += 20;
  }

  // Disclaimer footer
  const footerY = Math.max(y + 12, 1300);
  const finalHeight = footerY + 130;
  const trimmedCanvas = document.createElement("canvas");
  trimmedCanvas.width = width;
  trimmedCanvas.height = finalHeight;
  const tctx = trimmedCanvas.getContext("2d")!;
  tctx.fillStyle = "#F7F7F2";
  tctx.fillRect(0, 0, width, finalHeight);
  tctx.drawImage(canvas, 0, 0);

  tctx.fillStyle = "#EDF2E8";
  tctx.beginPath();
  tctx.roundRect(padding, footerY, contentWidth, 96, 14);
  tctx.fill();

  tctx.fillStyle = "#3E4C40";
  tctx.font = '500 17px "Manrope", "Noto Sans Devanagari", sans-serif';
  wrapText(tctx, t.disclaimerText, padding + 20, footerY + 34, contentWidth - 40, 24);

  return trimmedCanvas;
}

export async function downloadReportImage(
  result: PlantAnalysisResult,
  imageSrc: string,
  lang: Language,
  timestamp: number
): Promise<void> {
  const canvas = await renderReportCanvas(result, imageSrc, lang, timestamp);
  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = `FasalVaidya-${result.crop_name.replace(/\s+/g, "-")}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadReportPdf(
  result: PlantAnalysisResult,
  imageSrc: string,
  lang: Language,
  timestamp: number
): Promise<void> {
  const canvas = await renderReportCanvas(result, imageSrc, lang, timestamp);
  const imgData = canvas.toDataURL("image/jpeg", 0.92);
  const pdfWidth = 210; // A4 mm
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [pdfWidth, Math.max(297, pdfHeight)],
  });

  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`FasalVaidya-${result.crop_name.replace(/\s+/g, "-")}.pdf`);
}

export async function shareReport(
  result: PlantAnalysisResult,
  imageSrc: string,
  lang: Language,
  timestamp: number
): Promise<"shared" | "copied"> {
  const t = TRANSLATIONS[lang];
  const crop = lang === "hi" && result.crop_name_hi ? result.crop_name_hi : result.crop_name;
  const disease =
    lang === "hi" && result.disease_name_hi ? result.disease_name_hi : result.disease_name;
  const summary = lang === "hi" ? result.summary_hindi : result.summary_english;
  const treatments =
    lang === "hi" && result.treatment_hi?.length ? result.treatment_hi : result.treatment;

  const shareText = `${t.appName} (${t.tagline})\n${t.cropLabel}: ${crop}\n${disease} (${result.confidence.toFixed(1)}%)\n\n${summary}\n\n${t.treatmentTitle}:\n${treatments
    .map((step, i) => `${i + 1}. ${step}`)
    .join("\n")}\n\n${t.disclaimerText}`;

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      const canvas = await renderReportCanvas(result, imageSrc, lang, timestamp);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );
      if (blob) {
        const file = new File([blob], `FasalVaidya-${result.crop_name}.png`, {
          type: "image/png",
        });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${t.appName}: ${disease}`,
            text: shareText,
            files: [file],
          });
          return "shared";
        }
      }
      await navigator.share({
        title: `${t.appName}: ${disease}`,
        text: shareText,
      });
      return "shared";
    } catch {
      // Fallback to clipboard if user cancels or file share fails in iframe
    }
  }

  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(shareText);
  }
  return "copied";
}
