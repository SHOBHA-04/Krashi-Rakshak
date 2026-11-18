const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_DIMENSION = 1024;
const THUMB_MAX_DIMENSION = 200;

export interface ProcessedLeafImage {
  previewDataUrl: string;
  thumbnailDataUrl: string;
  base64: string;
  mimeType: string;
  width: number;
  height: number;
}

export type ImageValidationError = "INVALID_TYPE" | "TOO_LARGE" | "LOAD_FAILED";

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("LOAD_FAILED"));
    img.src = src;
  });
}

function resizeToDataUrl(
  img: HTMLImageElement,
  maxSide: number,
  mimeType: string,
  quality: number
): { dataUrl: string; width: number; height: number } {
  const ratio = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  const width = Math.max(1, Math.round(img.naturalWidth * ratio));
  const height = Math.max(1, Math.round(img.naturalHeight * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("LOAD_FAILED");
  }

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  const outputMime = mimeType === "image/webp" ? "image/webp" : "image/jpeg";
  const dataUrl = canvas.toDataURL(outputMime, quality);
  return { dataUrl, width, height };
}

/**
 * Validates file type (JPG/PNG/WebP) and size (<= 5 MB),
 * then resizes/compresses to max 1024px for low-bandwidth upload
 * plus a 200px thumbnail for localStorage history.
 */
export async function processLeafFile(file: File): Promise<ProcessedLeafImage> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error("INVALID_TYPE");
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("TOO_LARGE");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImageElement(objectUrl);
    const { dataUrl, width, height } = resizeToDataUrl(
      img,
      MAX_DIMENSION,
      file.type,
      0.84
    );
    const thumb = resizeToDataUrl(img, THUMB_MAX_DIMENSION, "image/jpeg", 0.72);
    const commaIdx = dataUrl.indexOf(",");
    const base64 = commaIdx >= 0 ? dataUrl.slice(commaIdx + 1) : dataUrl;
    const outputMime = file.type === "image/webp" ? "image/webp" : "image/jpeg";

    return {
      previewDataUrl: dataUrl,
      thumbnailDataUrl: thumb.dataUrl,
      base64,
      mimeType: outputMime,
      width,
      height,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

/**
 * Processes an image DataURL (e.g., from live WebRTC camera capture)
 * into the compressed 1024px analysis payload and 200px thumbnail.
 */
export async function processDataUrl(dataUrlInput: string): Promise<ProcessedLeafImage> {
  const img = await loadImageElement(dataUrlInput);
  const { dataUrl, width, height } = resizeToDataUrl(img, MAX_DIMENSION, "image/jpeg", 0.84);
  const thumb = resizeToDataUrl(img, THUMB_MAX_DIMENSION, "image/jpeg", 0.72);
  const commaIdx = dataUrl.indexOf(",");
  const base64 = commaIdx >= 0 ? dataUrl.slice(commaIdx + 1) : dataUrl;

  return {
    previewDataUrl: dataUrl,
    thumbnailDataUrl: thumb.dataUrl,
    base64,
    mimeType: "image/jpeg",
    width,
    height,
  };
}
