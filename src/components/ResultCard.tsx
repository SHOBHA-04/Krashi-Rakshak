import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  Info,
  Leaf,
  RotateCcw,
  Share2,
  ShieldAlert,
  Sprout,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { FeedbackAnswer, Language, PlantAnalysisResult } from "../types/plant";
import { TRANSLATIONS } from "../i18n/translations";
import {
  downloadReportImage,
  downloadReportPdf,
  shareReport,
} from "../utils/reportExport";

interface ResultCardProps {
  result: PlantAnalysisResult;
  imageSrc: string;
  language: Language;
  timestamp: number;
  isDemo?: boolean;
  existingFeedback?: FeedbackAnswer;
  onFeedback: (answer: FeedbackAnswer) => void;
  onScanAnother: () => void;
}

/**
 * Displays leaf diagnosis, SVG confidence meter, bilingual text-to-speech readout,
 * treatment & prevention guidance, farmer feedback, download/share, and KVK disclaimer.
 */
export function ResultCard({
  result,
  imageSrc,
  language,
  timestamp,
  isDemo,
  existingFeedback,
  onFeedback,
  onScanAnother,
}: ResultCardProps) {
  const t = TRANSLATIONS[language];
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Stop speech playback on unmount or language change
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language, result]);

  const cropName =
    language === "hi" && result.crop_name_hi ? result.crop_name_hi : result.crop_name;
  const diseaseName =
    language === "hi" && result.disease_name_hi
      ? result.disease_name_hi
      : result.disease_name;
  const affectedArea =
    language === "hi" && result.affected_area_description_hi
      ? result.affected_area_description_hi
      : result.affected_area_description;
  const summary = language === "hi" ? result.summary_hindi : result.summary_english;
  const symptoms =
    language === "hi" && result.symptoms_observed_hi?.length
      ? result.symptoms_observed_hi
      : result.symptoms_observed;
  const treatments =
    language === "hi" && result.treatment_hi?.length
      ? result.treatment_hi
      : result.treatment;
  const preventions =
    language === "hi" && result.prevention_tips_hi?.length
      ? result.prevention_tips_hi
      : result.prevention_tips;

  const toggleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setVoiceMessage(t.voiceUnsupported);
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const spokenText =
      result.status === "Unclear"
        ? `${t.unclearTitle}. ${t.unclearSubtitle} ${t.unclearTips.join(" ")}`
        : `${cropName}. ${diseaseName}. ${summary} ${t.treatmentTitle}: ${treatments.join(". ")}`;

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((v) =>
      v.lang.toLowerCase().startsWith(language === "hi" ? "hi" : "en")
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleDownloadImage = async () => {
    setIsExporting(true);
    try {
      await downloadReportImage(result, imageSrc, language, timestamp);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      await downloadReportPdf(result, imageSrc, language, timestamp);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    setIsExporting(true);
    try {
      const outcome = await shareReport(result, imageSrc, language, timestamp);
      if (outcome === "copied") {
        setShareStatus(t.shareCopied);
        setTimeout(() => setShareStatus(null), 3000);
      }
    } finally {
      setIsExporting(false);
    }
  };

  // Unclear leaf image view
  if (result.status === "Unclear") {
    return (
      <div className="bg-white rounded-3xl border border-[#E2E6DC] shadow-sm p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <div className="w-full sm:w-44 aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAECE4] shrink-0 border border-[#E2E6DC]">
            <img
              src={imageSrc}
              alt="Uploaded unclear leaf image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#FEF3C7] text-[#92400E] text-sm font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.statusUnclear}</span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#162218] text-balance">
              {t.unclearTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#526054]">{t.unclearSubtitle}</p>
            {summary && (
              <p className="text-sm text-[#162218] bg-[#F7F7F2] rounded-xl p-3 border border-[#E2E6DC]">
                {summary}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-[#E2E6DC] pt-5 space-y-3">
          <h3 className="font-display font-semibold text-base text-[#162218]">
            {t.unclearTipsTitle}
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {t.unclearTips.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm text-[#2E3A30] bg-[#F7F7F2] rounded-xl p-3"
              >
                <span className="font-semibold text-[#2E7D32] tabular-nums">{idx + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={onScanAnother}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-base inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
            <span>{t.scanAnother}</span>
          </button>
          <button
            type="button"
            onClick={toggleSpeak}
            className="min-h-[48px] px-5 py-3 rounded-xl bg-[#F4F6F0] hover:bg-[#E9EDE3] text-[#162218] font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSpeaking ? (
              <VolumeX className="w-5 h-5 text-[#C62828]" aria-hidden="true" />
            ) : (
              <Volume2 className="w-5 h-5 text-[#2E7D32]" aria-hidden="true" />
            )}
            <span>{isSpeaking ? t.stopListening : t.listenAdvice}</span>
          </button>
        </div>

        <div className="rounded-2xl bg-[#F4F6F0] p-4 flex items-start gap-3 text-xs sm:text-sm text-[#3E4C40]">
          <Info className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" aria-hidden="true" />
          <p>{t.disclaimerText}</p>
        </div>
      </div>
    );
  }

  // Healthy / Diseased badge visual tokens (color + icon + text)
  const isHealthy = result.status === "Healthy";
  const isHighSeverity = !isHealthy && result.severity === "High";
  const badgeClasses = isHealthy
    ? "bg-[#E8F5E9] text-[#1B5E20] border-[#B7DFB9]"
    : isHighSeverity
      ? "bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]"
      : "bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]";

  const badgeLabel = isHealthy
    ? t.statusHealthy
    : result.severity === "High"
      ? t.severityHigh
      : result.severity === "Medium"
        ? t.severityMedium
        : t.severityLow;

  // Circular SVG confidence meter math
  const clampedConfidence = Math.min(100, Math.max(0, result.confidence));
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clampedConfidence / 100) * circumference;
  const meterStroke = isHealthy ? "#2E7D32" : isHighSeverity ? "#C62828" : "#D97706";

  return (
    <article className="bg-white rounded-3xl border border-[#E2E6DC] shadow-sm p-5 sm:p-7 space-y-6">
      {/* Header Summary Band */}
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#EAECE4] border border-[#E2E6DC] shrink-0">
            <img
              src={imageSrc}
              alt={`${cropName} — ${diseaseName}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#526054]">
              <span>
                {t.cropLabel}: <strong className="text-[#162218]">{cropName}</strong>
              </span>
              {isDemo && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{t.demoBadge}</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {new Date(timestamp).toLocaleDateString(
                  language === "hi" ? "hi-IN" : "en-IN",
                  { day: "numeric", month: "short", year: "numeric" }
                )}
              </span>
            </div>

            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#162218] leading-tight text-balance">
              {diseaseName}
            </h2>

            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-sm font-semibold ${badgeClasses}`}
            >
              {isHealthy ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              ) : isHighSeverity ? (
                <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
              )}
              <span>{badgeLabel}</span>
            </div>
          </div>
        </div>

        {/* Circular Confidence Meter */}
        <div className="flex items-center gap-3 self-stretch sm:self-center justify-between sm:justify-end bg-[#F7F7F2] sm:bg-transparent rounded-2xl p-3 sm:p-0">
          <div className="sm:hidden">
            <p className="text-xs font-medium text-[#526054]">{t.confidenceLabel}</p>
            <p className="font-display font-bold text-lg text-[#162218] tabular-nums">
              {clampedConfidence.toFixed(1)}%
            </p>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke="#E4E8DE"
                strokeWidth="7"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                fill="none"
                stroke={meterStroke}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display font-bold text-sm text-[#162218] tabular-nums">
                {clampedConfidence.toFixed(1)}%
              </span>
              <span className="text-[10px] text-[#526054] leading-none">
                {t.confidenceLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Listen Bar + Summary */}
      <div className="rounded-2xl bg-[#F4F8F2] border border-[#DCE8D8] p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display font-semibold text-base text-[#162218]">
            {t.summaryTitle}
          </h3>
          <button
            type="button"
            onClick={toggleSpeak}
            aria-pressed={isSpeaking}
            className={`min-h-[44px] px-4 py-2 rounded-xl font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer shrink-0 ${
              isSpeaking
                ? "bg-[#C62828] text-white hover:bg-[#B71C1C]"
                : "bg-[#2E7D32] text-white hover:bg-[#1B5E20]"
            }`}
          >
            {isSpeaking ? (
              <VolumeX className="w-4 h-4 shrink-0" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            )}
            <span>{isSpeaking ? t.stopListening : t.listenAdvice}</span>
          </button>
        </div>

        <p className="text-sm sm:text-base text-[#1F2E22] leading-relaxed">{summary}</p>
        {voiceMessage && <p className="text-xs text-[#92400E]">{voiceMessage}</p>}
      </div>

      {/* Affected Area & Symptoms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#E2E6DC] pt-5">
        <section className="space-y-2">
          <h3 className="font-display font-semibold text-base text-[#162218] flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#2E7D32] shrink-0" aria-hidden="true" />
            <span>{t.affectedAreaTitle}</span>
          </h3>
          <p className="text-sm sm:text-base text-[#364438] leading-relaxed">{affectedArea}</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-semibold text-base text-[#162218]">
            {t.symptomsTitle}
          </h3>
          <ul className="space-y-2">
            {symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#364438]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2E7D32] shrink-0" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Treatment & Prevention */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#E2E6DC] pt-5">
        <section className="space-y-2.5">
          <div>
            <h3 className="font-display font-semibold text-base text-[#162218] flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#2E7D32] shrink-0" aria-hidden="true" />
              <span>{t.treatmentTitle}</span>
            </h3>
            <p className="text-xs text-[#526054] mt-0.5">{t.treatmentNote}</p>
          </div>
          <ol className="space-y-2.5">
            {treatments.map((step, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm sm:text-base text-[#1F2E22] bg-[#F7F7F2] rounded-xl p-3"
              >
                <span className="w-6 h-6 rounded-full bg-[#2E7D32] text-white text-xs font-bold flex items-center justify-center shrink-0 tabular-nums mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-2.5">
          <h3 className="font-display font-semibold text-base text-[#162218]">
            {t.preventionTitle}
          </h3>
          <ul className="space-y-2.5">
            {preventions.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-sm sm:text-base text-[#364438] bg-[#F7F7F2] rounded-xl p-3"
              >
                <CheckCircle2
                  className="w-4 h-4 text-[#2E7D32] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Farmer Feedback Step */}
      <div className="border-t border-[#E2E6DC] pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="font-display font-semibold text-sm sm:text-base text-[#162218]">
            {t.feedbackQuestion}
          </p>
          {existingFeedback && (
            <p className="text-xs text-[#2E7D32] font-medium mt-0.5">
              {existingFeedback === "yes" ? t.feedbackThanksYes : t.feedbackThanksNo}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onFeedback("yes")}
            aria-pressed={existingFeedback === "yes"}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 border transition-colors cursor-pointer ${
              existingFeedback === "yes"
                ? "bg-[#2E7D32] text-white border-[#2E7D32]"
                : "bg-white text-[#162218] border-[#CFD8C8] hover:bg-[#F4F8F2]"
            }`}
          >
            <ThumbsUp className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.feedbackYes}</span>
          </button>
          <button
            type="button"
            onClick={() => onFeedback("no")}
            aria-pressed={existingFeedback === "no"}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 border transition-colors cursor-pointer ${
              existingFeedback === "no"
                ? "bg-[#C62828] text-white border-[#C62828]"
                : "bg-white text-[#162218] border-[#CFD8C8] hover:bg-[#FEF2F2]"
            }`}
          >
            <ThumbsDown className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.feedbackNo}</span>
          </button>
        </div>
      </div>

      {/* Download / Share / Scan Another Actions */}
      <div className="border-t border-[#E2E6DC] pt-5 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          disabled={isExporting}
          onClick={() => void handleDownloadImage()}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F4F6F0] hover:bg-[#E9EDE3] text-[#162218] text-sm font-semibold inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Download className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
          <span>{t.downloadImage}</span>
        </button>

        <button
          type="button"
          disabled={isExporting}
          onClick={() => void handleDownloadPdf()}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F4F6F0] hover:bg-[#E9EDE3] text-[#162218] text-sm font-semibold inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <FileText className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
          <span>{t.downloadPdf}</span>
        </button>

        <button
          type="button"
          disabled={isExporting}
          onClick={() => void handleShare()}
          className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F4F6F0] hover:bg-[#E9EDE3] text-[#162218] text-sm font-semibold inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Share2 className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
          <span>{t.shareReport}</span>
        </button>

        <button
          type="button"
          onClick={onScanAnother}
          className="sm:ml-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>{t.scanAnother}</span>
        </button>
      </div>

      {shareStatus && (
        <p role="status" className="text-xs font-medium text-[#2E7D32]">
          {shareStatus}
        </p>
      )}

      {/* Mandatory KVK Agricultural Safety Disclaimer */}
      <div className="rounded-2xl bg-[#F7F7F2] border border-[#E2E6DC] p-4 flex items-start gap-3 text-xs sm:text-sm text-[#3E4C40]">
        <Info className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" aria-hidden="true" />
        <p>{t.disclaimerText}</p>
      </div>
    </article>
  );
}
