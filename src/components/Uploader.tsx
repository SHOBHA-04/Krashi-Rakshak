import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  Camera,
  ChevronLeft,
  ChevronRight,
  Leaf,
  RefreshCw,
  RotateCcw,
  ScanLine,
  Upload,
  X,
} from "lucide-react";
import type { DemoSample, Language } from "../types/plant";
import { TRANSLATIONS } from "../i18n/translations";
import { DEMO_SAMPLES } from "../data/demoSamples";
import {
  processDataUrl,
  processLeafFile,
  type ProcessedLeafImage,
} from "../utils/imageProcessor";

interface UploaderProps {
  language: Language;
  previewImage: ProcessedLeafImage | null;
  isAnalyzing: boolean;
  errorMessage: string | null;
  onImageReady: (img: ProcessedLeafImage) => void;
  onClearImage: () => void;
  onAnalyze: () => void;
  onSelectDemo: (sample: DemoSample) => void;
  onValidationError: (message: string) => void;
}

/**
 * Handles file upload, mobile/desktop camera capture, drag-and-drop,
 * image preview, scanning animation, and demo sample selection.
 */
export function Uploader({
  language,
  previewImage,
  isAnalyzing,
  errorMessage,
  onImageReady,
  onClearImage,
  onAnalyze,
  onSelectDemo,
  onValidationError,
}: UploaderProps) {
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraNotice, setCameraNotice] = useState<string | null>(null);

  const scrollGallery = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;
    const distance = Math.max(240, container.clientWidth * 0.72);
    container.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopCameraStream();
  }, []);

  const handleSelectedFile = async (file: File | undefined) => {
    if (!file) return;
    setIsProcessingFile(true);
    try {
      const processed = await processLeafFile(file);
      onImageReady(processed);
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      if (code === "INVALID_TYPE") {
        onValidationError(t.invalidFileType);
      } else if (code === "TOO_LARGE") {
        onValidationError(t.fileTooLarge);
      } else {
        onValidationError(t.invalidFileType);
      }
    } finally {
      setIsProcessingFile(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isAnalyzing) return;
    const file = e.dataTransfer.files?.[0];
    await handleSelectedFile(file);
  };

  const openCamera = async () => {
    setCameraNotice(null);
    // On mobile touch browsers or environments without getUserMedia, native capture input is fast and dependable
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      cameraInputRef.current?.click();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraOpen(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      });
    } catch {
      setCameraNotice(t.cameraUnavailable);
      cameraInputRef.current?.click();
    }
  };

  const captureFromLiveVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1024;
    canvas.height = video.videoHeight || 768;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    stopCameraStream();
    setCameraOpen(false);

    setIsProcessingFile(true);
    try {
      const processed = await processDataUrl(dataUrl);
      onImageReady(processed);
    } catch {
      onValidationError(t.invalidFileType);
    } finally {
      setIsProcessingFile(false);
    }
  };

  const closeCamera = () => {
    stopCameraStream();
    setCameraOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        aria-label={t.uploadLeafPhoto}
        onChange={(e) => {
          void handleSelectedFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        className="sr-only"
        aria-label={t.useCamera}
        onChange={(e) => {
          void handleSelectedFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />

      {/* Main Upload / Preview Surface */}
      <div className="bg-white rounded-3xl border border-[#DCE3D4] shadow-sm p-4 sm:p-6">
        {!previewImage ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`rounded-2xl border-2 border-dashed transition-colors p-6 sm:p-8 text-center ${
              isDragging
                ? "border-[#2E7D32] bg-[#EDF6EE]"
                : "border-[#C4D2BC] bg-gradient-to-b from-[#FAFBF7] to-[#F3F6EE]"
            }`}
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E4F4E5] to-[#D1EAD3] border border-[#B8DCBA] text-[#2E7D32] flex items-center justify-center mb-4 shadow-xs">
              <Leaf className="w-8 h-8" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              <button
                type="button"
                disabled={isProcessingFile}
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[54px] px-5 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] active:scale-[0.99] text-white font-semibold text-base flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32]"
              >
                <Upload className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{t.uploadLeafPhoto}</span>
              </button>

              <button
                type="button"
                disabled={isProcessingFile}
                onClick={() => void openCamera()}
                className="min-h-[54px] px-5 py-3 rounded-xl bg-white hover:bg-[#F1F5EE] active:scale-[0.99] text-[#132115] border border-[#C4D2BC] font-semibold text-base flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32]"
              >
                <Camera className="w-5 h-5 shrink-0 text-[#2E7D32]" aria-hidden="true" />
                <span>{t.useCamera}</span>
              </button>
            </div>

            <p className="hidden sm:block mt-4 text-sm text-[#4C5C4E]">{t.dragDropHint}</p>
            <p className="mt-3 text-xs text-[#5B6B5D]">{t.supportedFormats}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Image Preview with Optional Scanning Beam Overlay */}
            <div className="relative rounded-2xl overflow-hidden bg-[#162218]/5 border border-[#E2E6DC] aspect-[4/3] max-h-[380px] w-full flex items-center justify-center">
              <img
                src={previewImage.previewDataUrl}
                alt="Selected plant leaf preview for disease analysis"
                className="w-full h-full object-contain"
              />

              {isAnalyzing && (
                <div
                  role="status"
                  aria-live="polite"
                  className="absolute inset-0 bg-[#142316]/45 backdrop-blur-[1px] flex flex-col items-center justify-center p-4"
                >
                  {/* Animated scanning laser bar */}
                  <div className="animate-leaf-scan absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-[#66BB6A]/65 to-transparent border-b-2 border-[#A5D6A7]" />

                  <div className="relative z-10 bg-white/95 rounded-2xl px-5 py-4 shadow-md text-center max-w-xs">
                    <div className="mx-auto w-10 h-10 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-2">
                      <ScanLine className="w-5 h-5 animate-pulse" aria-hidden="true" />
                    </div>
                    <p className="font-display font-semibold text-sm sm:text-base text-[#162218]">
                      {t.analyzingTitle}
                    </p>
                    <p className="text-xs text-[#526054] mt-1">{t.analyzingSubtitle}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                disabled={isAnalyzing}
                onClick={onAnalyze}
                className="flex-1 min-h-[52px] px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] active:scale-[0.99] text-white font-semibold text-base flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32]"
              >
                <ScanLine className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{t.analyzeLeaf}</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={() => void openCamera()}
                  className="flex-1 sm:flex-none min-h-[52px] px-4 py-3 rounded-xl bg-[#F4F6F0] hover:bg-[#E9EDE3] text-[#162218] font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.retakePhoto}</span>
                </button>
                <button
                  type="button"
                  disabled={isAnalyzing}
                  onClick={onClearImage}
                  className="flex-1 sm:flex-none min-h-[52px] px-4 py-3 rounded-xl bg-[#F4F6F0] hover:bg-[#E9EDE3] text-[#162218] font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <X className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{t.changePhoto}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {cameraNotice && (
          <p className="mt-3 text-xs text-[#526054] text-center">{cameraNotice}</p>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="mt-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#C62828] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-[#991B1B]">{t.errorTitle}</p>
                <p className="text-sm text-[#7F1D1D] mt-0.5">{errorMessage}</p>
              </div>
            </div>
            {previewImage && (
              <button
                type="button"
                onClick={onAnalyze}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#C62828] hover:bg-[#B71C1C] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                <span>{t.retryButton}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Live WebRTC Camera Modal */}
      {cameraOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.cameraCaptureTitle}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-xl border border-[#E2E6DC]">
            <div className="px-5 py-4 flex items-center justify-between border-b border-[#E2E6DC]">
              <h3 className="font-display font-semibold text-base text-[#162218]">
                {t.cameraCaptureTitle}
              </h3>
              <button
                type="button"
                onClick={closeCamera}
                aria-label={t.closeCamera}
                className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-[#526054] hover:bg-[#F4F6F0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-black aspect-[4/3] w-full overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex gap-3">
              <button
                type="button"
                onClick={closeCamera}
                className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#F4F6F0] text-[#162218] font-medium text-sm"
              >
                {t.closeCamera}
              </button>
              <button
                type="button"
                onClick={() => void captureFromLiveVideo()}
                className="flex-1 min-h-[48px] px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-base flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" aria-hidden="true" />
                <span>{t.captureNow}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Crop Leaf Gallery / Quick Demo Strip */}
      <section aria-labelledby="demo-heading" className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 id="demo-heading" className="font-display font-bold text-lg text-[#132115]">
              {t.tryDemoHeading}
            </h2>
            <p className="text-sm text-[#4C5C4E]">{t.tryDemoSubheading}</p>
          </div>

          {/* Horizontal Scroll Navigation Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => scrollGallery("left")}
              aria-label="Scroll crop photos left"
              className="min-h-[44px] min-w-[44px] rounded-xl bg-white hover:bg-[#EDF2E8] border border-[#DCE3D4] text-[#132115] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollGallery("right")}
              aria-label="Scroll crop photos right"
              className="min-h-[44px] min-w-[44px] rounded-xl bg-white hover:bg-[#EDF2E8] border border-[#DCE3D4] text-[#132115] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-1"
        >
          {DEMO_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              disabled={isAnalyzing}
              onClick={() => onSelectDemo(sample)}
              className="group snap-start shrink-0 w-[210px] sm:w-[225px] text-left bg-white hover:border-[#2E7D32] rounded-2xl border border-[#DCE3D4] overflow-hidden transition-all cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32]"
            >
              <div className="relative aspect-[4/3] w-full bg-[#EAECE4] overflow-hidden">
                <img
                  src={sample.imageUrl}
                  alt={language === "hi" ? sample.labelHi : sample.labelEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/65 via-black/25 to-transparent"
                />
                <span className="absolute bottom-2 left-2.5 right-2.5 text-xs font-semibold text-white truncate tabular-nums">
                  {sample.result.confidence.toFixed(1)}% ·{" "}
                  {sample.result.status === "Healthy"
                    ? t.statusHealthy
                    : sample.result.severity}
                </span>
              </div>
              <div className="p-3 min-w-0">
                <p className="font-display font-bold text-sm text-[#132115] truncate">
                  {language === "hi" ? sample.labelHi : sample.labelEn}
                </p>
                <p className="text-xs text-[#4C5C4E] mt-0.5 tabular-nums truncate">
                  {language === "hi" ? sample.subtitleHi : sample.subtitleEn}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
