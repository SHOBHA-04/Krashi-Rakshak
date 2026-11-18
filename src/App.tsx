import { useState } from "react";
import { BookOpen, History as HistoryIcon, Info, ScanLine } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type {
  AppTab,
  DemoSample,
  FeedbackAnswer,
  Language,
  PlantAnalysisResult,
  ScanHistoryItem,
} from "./types/plant";
import { TRANSLATIONS } from "./i18n/translations";
import { FARMER_SCAN_IMAGE, HERO_FIELD_IMAGE } from "./data/demoSamples";
import { type ProcessedLeafImage } from "./utils/imageProcessor";
import {
  clearHistory,
  deleteHistoryItem,
  loadHistory,
  loadLanguage,
  saveFarmerFeedback,
  saveLanguage,
  saveScanToHistory,
} from "./utils/storage";
import { LanguageToggle } from "./components/LanguageToggle";
import { Uploader } from "./components/Uploader";
import { ResultCard } from "./components/ResultCard";
import { History } from "./components/History";
import { HowItWorks } from "./components/HowItWorks";
import { AnimatedBrand } from "./components/AnimatedBrand";
import { About } from "./components/About";

interface ActiveScanView {
  id: string;
  imageSrc: string;
  result: PlantAnalysisResult;
  timestamp: number;
  isDemo?: boolean;
  feedback?: FeedbackAnswer;
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => loadLanguage());
  const [activeTab, setActiveTab] = useState<AppTab>("scan");
  const [previewImage, setPreviewImage] = useState<ProcessedLeafImage | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<ActiveScanView | null>(null);
  const [historyItems, setHistoryItems] = useState<ScanHistoryItem[]>(() => loadHistory());

  const t = TRANSLATIONS[language];

  const handleLanguageChange = (nextLang: Language) => {
    setLanguage(nextLang);
    saveLanguage(nextLang);
  };

  const handleImageReady = (img: ProcessedLeafImage) => {
    setPreviewImage(img);
    setErrorMessage(null);
    setActiveResult(null);
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setErrorMessage(null);
  };

  const handleAnalyze = async () => {
    if (!previewImage || isAnalyzing) return;

    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setErrorMessage(t.offlineError);
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 35000);

    try {
      const response = await fetch("/api/analyze-leaf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: previewImage.base64,
          mimeType: previewImage.mimeType,
          language,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Server analysis failed");
      }

      const result = data as PlantAnalysisResult;
      const scanId = `scan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const timestamp = Date.now();

      const newHistoryItem: ScanHistoryItem = {
        id: scanId,
        timestamp,
        thumbnailDataUrl: previewImage.thumbnailDataUrl,
        result,
        isDemo: false,
      };

      const updatedHistory = saveScanToHistory(newHistoryItem);
      setHistoryItems(updatedHistory);

      setActiveResult({
        id: scanId,
        imageSrc: previewImage.previewDataUrl,
        result,
        timestamp,
        isDemo: false,
      });
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setErrorMessage(t.timeoutError);
      } else if (typeof navigator !== "undefined" && navigator.onLine === false) {
        setErrorMessage(t.offlineError);
      } else {
        setErrorMessage(err instanceof Error ? err.message : t.timeoutError);
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsAnalyzing(false);
    }
  };

  const handleSelectDemo = (sample: DemoSample) => {
    setErrorMessage(null);
    setPreviewImage(null);

    const scanId = `${sample.id}-${Date.now()}`;
    const timestamp = Date.now();

    const newHistoryItem: ScanHistoryItem = {
      id: scanId,
      timestamp,
      thumbnailDataUrl: sample.imageUrl,
      result: sample.result,
      isDemo: true,
    };

    const updatedHistory = saveScanToHistory(newHistoryItem);
    setHistoryItems(updatedHistory);

    setActiveResult({
      id: scanId,
      imageSrc: sample.imageUrl,
      result: sample.result,
      timestamp,
      isDemo: true,
    });
  };

  const handleFeedback = (answer: FeedbackAnswer) => {
    if (!activeResult) return;

    setActiveResult((prev) => (prev ? { ...prev, feedback: answer } : null));
    const updatedHistory = saveFarmerFeedback({
      scanId: activeResult.id,
      answer,
      cropName: activeResult.result.crop_name,
      diseaseName: activeResult.result.disease_name,
      timestamp: Date.now(),
    });
    setHistoryItems(updatedHistory);
  };

  const handleScanAnother = () => {
    setActiveResult(null);
    setPreviewImage(null);
    setErrorMessage(null);
    setActiveTab("scan");
  };

  const handleSelectHistoryItem = (item: ScanHistoryItem) => {
    setActiveResult({
      id: item.id,
      imageSrc: item.thumbnailDataUrl,
      result: item.result,
      timestamp: item.timestamp,
      isDemo: item.isDemo,
      feedback: item.feedback,
    });
    setPreviewImage(null);
    setErrorMessage(null);
    setActiveTab("scan");
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteHistoryItem(id);
    setHistoryItems(updated);
    if (activeResult?.id === id) {
      setActiveResult(null);
    }
  };

  const handleClearAllHistory = () => {
    setHistoryItems(clearHistory());
  };

  const navItems: { id: AppTab; label: string; icon: typeof ScanLine }[] = [
    { id: "scan", label: t.navScan, icon: ScanLine },
    { id: "history", label: t.navHistory, icon: HistoryIcon },
    { id: "how", label: t.navHowItWorks, icon: BookOpen },
    { id: "about", label: t.navAbout, icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F2] text-[#162218]">
      {/* 3-Zone Top Navigation Bar (non-sticky on mobile to preserve viewport height) */}
      <header className="md:sticky md:top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E6DC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Single-line Animated Brand Wordmark */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("scan");
              setActiveResult(null);
            }}
            aria-label={t.appName}
            className="flex items-center text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] rounded-lg"
          >
            <AnimatedBrand language={language} size="header" />
          </button>

          {/* Zone 2: Desktop Single-Line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium"
          >
            {navItems.map((nav) => {
              const isActive = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => setActiveTab(nav.id)}
                  className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? "border-[#2E7D32] text-[#2E7D32] font-semibold"
                      : "border-transparent text-[#526054] hover:text-[#162218]"
                  }`}
                >
                  {nav.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Switcher */}
          <div className="shrink-0">
            <LanguageToggle language={language} onChange={handleLanguageChange} />
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-8 pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          {activeTab === "scan" && (
            <motion.div
              key={activeResult ? "result-view" : "uploader-view"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeResult ? (
                <ResultCard
                  result={activeResult.result}
                  imageSrc={activeResult.imageSrc}
                  language={language}
                  timestamp={activeResult.timestamp}
                  isDemo={activeResult.isDemo}
                  existingFeedback={activeResult.feedback}
                  onFeedback={handleFeedback}
                  onScanAnother={handleScanAnother}
                />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Left Column: Editorial Botanical Hero & Field Context */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-5 space-y-4"
                  >
                    <div className="relative rounded-3xl overflow-hidden bg-[#122816] text-white border border-[#244329] shadow-md">
                      <div className="h-44 sm:h-56 w-full overflow-hidden">
                        <img
                          src={HERO_FIELD_IMAGE}
                          alt="Indian smallholder tomato and vegetable farm in morning sunlight"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-48 sm:h-60 bg-gradient-to-t from-[#122816] via-[#122816]/45 to-transparent"
                      />

                      <div className="relative z-10 px-5 pb-6 sm:px-6 sm:pb-7 -mt-12 space-y-3">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                          className="inline-flex items-center bg-white/95 rounded-2xl px-3.5 py-2 shadow-sm max-w-full"
                        >
                          <AnimatedBrand language={language} size="header" />
                        </motion.div>

                        <p className="font-display font-bold text-base sm:text-lg text-[#B9E8B5] leading-snug">
                          {t.tagline}
                        </p>

                        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight text-balance">
                          {t.heroTitle}
                        </h1>

                        <p className="text-sm text-[#DCE7DA] leading-relaxed">
                          {t.heroSubtitle}
                        </p>

                        <div className="pt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#A6C9AC]">
                          <span>{language === "hi" ? "10+ प्रमुख फसलें" : "10+ Major Crops"}</span>
                          <span aria-hidden="true">·</span>
                          <span>{language === "hi" ? "हिंदी व अंग्रेज़ी आवाज़" : "Hindi & English Voice"}</span>
                          <span aria-hidden="true">·</span>
                          <span>{language === "hi" ? "जैविक व सुरक्षित उपाय" : "Organic-First Care"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-[#DCE3D4] bg-white p-3.5 flex items-center gap-3.5 shadow-xs">
                      <div className="w-20 h-14 rounded-xl overflow-hidden bg-[#E8EDE2] shrink-0">
                        <img
                          src={FARMER_SCAN_IMAGE}
                          alt="Farmer holding smartphone to scan crop leaf"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#4C5C4E] leading-relaxed">
                        <Info
                          className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <p>{t.disclaimerText}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column: Interactive Leaf Uploader & Demo Strip */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-7"
                  >
                    <Uploader
                      language={language}
                      previewImage={previewImage}
                      isAnalyzing={isAnalyzing}
                      errorMessage={errorMessage}
                      onImageReady={handleImageReady}
                      onClearImage={handleClearImage}
                      onAnalyze={() => void handleAnalyze()}
                      onSelectDemo={handleSelectDemo}
                      onValidationError={(msg) => setErrorMessage(msg)}
                    />
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history-tab"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <History
                language={language}
                items={historyItems}
                onSelectItem={handleSelectHistoryItem}
                onDeleteItem={handleDeleteHistoryItem}
                onClearAll={handleClearAllHistory}
                onGoToScan={() => setActiveTab("scan")}
              />
            </motion.div>
          )}

          {activeTab === "how" && (
            <motion.div
              key="how-tab"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <HowItWorks
                language={language}
                onStartScan={() => setActiveTab("scan")}
              />
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <About language={language} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sticky Bottom Tab Navigation for Mobile (<= 15% viewport height) */}
      <nav
        aria-label="Mobile bottom navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E6DC]"
      >
        <div className="grid grid-cols-4 h-16 items-center">
          {navItems.map((nav) => {
            const Icon = nav.icon;
            const isActive = activeTab === nav.id;
            return (
              <button
                key={nav.id}
                type="button"
                onClick={() => setActiveTab(nav.id)}
                className={`relative min-h-[48px] flex flex-col items-center justify-center gap-1 px-1 transition-colors cursor-pointer ${
                  isActive ? "text-[#2E7D32] font-bold" : "text-[#4C5C4E]"
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 w-8 h-0.5 rounded-full bg-[#2E7D32]"
                  />
                )}
                <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="text-[11px] leading-none truncate max-w-full">
                  {nav.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
