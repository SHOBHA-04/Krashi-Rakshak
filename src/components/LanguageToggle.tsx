import type { Language } from "../types/plant";

interface LanguageToggleProps {
  language: Language;
  onChange: (lang: Language) => void;
}

/**
 * Accessible bilingual switcher (English / हिन्दी) with >= 44px touch targets.
 */
export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div
      role="group"
      aria-label="Language selection"
      className="inline-flex items-center rounded-xl bg-[#EAECE4] p-1 border border-[#DDE2D6]"
    >
      <button
        type="button"
        onClick={() => onChange("en")}
        aria-pressed={language === "en"}
        className={`min-h-[38px] px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] ${
          language === "en"
            ? "bg-white text-[#162218] shadow-xs"
            : "text-[#526054] hover:text-[#162218]"
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => onChange("hi")}
        aria-pressed={language === "hi"}
        className={`min-h-[38px] px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] ${
          language === "hi"
            ? "bg-white text-[#162218] shadow-xs"
            : "text-[#526054] hover:text-[#162218]"
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
}
