import { AnimatePresence, motion } from "motion/react";
import type { Language } from "../types/plant";

interface AnimatedBrandProps {
  language: Language;
  size?: "header" | "hero";
}

/**
 * Animated FasalVaidya / फ़सलवैद्य emblem and split-wordmark using
 * compositor-only transform and opacity transitions.
 */
export function AnimatedBrand({ language, size = "header" }: AnimatedBrandProps) {
  const isHero = size === "hero";
  const prefix = language === "hi" ? "फ़सल" : "Fasal";
  const suffix = language === "hi" ? "वैद्य" : "Vaidya";

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none group">
      {/* Animated Botanical Emblem */}
      <motion.span
        initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.06, rotate: 3 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white flex items-center justify-center shrink-0 shadow-xs ${
          isHero ? "w-11 h-11" : "w-8 h-8 rounded-lg"
        }`}
      >
        {/* Subtle diagonal sheen sweep */}
        <span
          aria-hidden="true"
          className="animate-brand-sheen pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
        />
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={isHero ? "w-6 h-6" : "w-4 h-4"}
          animate={{ rotate: [0, 3, -2, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M19.5 4.5C13 4.5 7.5 7.8 5.5 13.5C4.8 15.5 5 17.7 5.5 19.5C7.3 19 9.5 18.8 11.5 18.1C17.2 16.1 19.5 10.6 19.5 4.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 19.5C8.5 15.5 12 12 16.5 8.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M11.5 10.5H14.5M13 9V12"
            stroke="#DCEDC8"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </motion.svg>
      </motion.span>

      {/* Split Animated Wordmark */}
      <AnimatePresence mode="wait">
        <motion.span
          key={language}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className={`font-display font-extrabold tracking-tight whitespace-nowrap shrink-0 inline-flex items-baseline ${
            isHero ? "text-2xl sm:text-3xl" : "text-lg sm:text-[19px]"
          }`}
        >
          <span className="text-[#162218]">{prefix}</span>
          <motion.span
            initial={{ opacity: 0, x: -3 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.32, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="text-brand-shimmer"
          >
            {suffix}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
