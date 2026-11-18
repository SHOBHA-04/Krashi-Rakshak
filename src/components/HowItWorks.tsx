import { Camera, CheckCircle2, Cpu, ScanSearch, Sprout } from "lucide-react";
import type { Language } from "../types/plant";
import { TRANSLATIONS } from "../i18n/translations";
import { FARMER_SCAN_IMAGE } from "../data/demoSamples";

interface HowItWorksProps {
  language: Language;
  onStartScan: () => void;
}

const STEP_ICONS = [Camera, ScanSearch, Cpu, Sprout];

/**
 * Explains the 4-step plant disease detection pipeline, CNN classification note,
 * supported PlantVillage crops, and outdoor photo tips with field photography.
 */
export function HowItWorks({ language, onStartScan }: HowItWorksProps) {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-8">
      {/* Editorial Field Header Split */}
      <div className="bg-white rounded-3xl border border-[#DCE3D4] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-center space-y-4">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#132115] leading-tight text-balance">
            {t.howTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#4C5C4E] leading-relaxed">
            {t.howSubtitle}
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={onStartScan}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-base inline-flex items-center justify-center cursor-pointer transition-colors"
            >
              {t.navScan}
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 min-h-[220px] lg:min-h-[280px] bg-[#E8EDE2]">
          <img
            src={FARMER_SCAN_IMAGE}
            alt="Farmer capturing a close-up leaf photograph in sunlight"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 4-Step Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.howSteps.map((step, idx) => {
          const Icon = STEP_ICONS[idx] || Sprout;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#DCE3D4] p-5 space-y-3"
            >
              <div className="w-11 h-11 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="font-display font-bold text-base text-[#132115]">
                {step.title}
              </h2>
              <p className="text-sm text-[#4C5C4E] leading-relaxed">{step.description}</p>
            </div>
          );
        })}
      </div>

      {/* CNN Classification Note & Photo Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-3xl border border-[#DCE3D4] p-6 space-y-3">
          <h2 className="font-display font-bold text-lg text-[#132115]">
            {t.cnnTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#364438] leading-relaxed">
            {t.cnnDescription}
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-[#DCE3D4] p-6 space-y-3">
          <h2 className="font-display font-bold text-lg text-[#132115]">
            {t.photoTipsTitle}
          </h2>
          <ul className="space-y-2.5">
            {t.photoTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#364438]">
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

      {/* Supported Crops */}
      <section className="bg-white rounded-3xl border border-[#DCE3D4] p-6 space-y-4">
        <div>
          <h2 className="font-display font-bold text-lg text-[#132115]">
            {t.supportedCropsTitle}
          </h2>
          <p className="text-sm text-[#4C5C4E] mt-1">{t.supportedCropsSubtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {t.supportedCrops.map((crop, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#F5F4EC] border border-[#DCE3D4] px-3.5 py-2.5 text-sm"
            >
              <p className="font-semibold text-[#132115]">
                {language === "hi" ? crop.hi : crop.en}
              </p>
              <p className="text-xs text-[#4C5C4E]">
                {language === "hi" ? crop.en : crop.hi}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
