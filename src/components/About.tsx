import { Award, Building2, Info, ShieldCheck, User, UserCheck } from "lucide-react";
import type { Language } from "../types/plant";
import { TRANSLATIONS } from "../i18n/translations";
import { HERO_FIELD_IMAGE } from "../data/demoSamples";

interface AboutProps {
  language: Language;
}

/**
 * Displays project attribution (Shobha Bharti, IT-CITS NSTI Kanpur,
 * Trainer Mohammad Kashif Siddiqui), field imagery, mission, privacy notice, and KVK disclaimer.
 */
export function About({ language }: AboutProps) {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6">
      {/* Top Visual Field Showcase */}
      <div className="relative rounded-3xl overflow-hidden border border-[#DCE3D4] bg-[#132A17] min-h-[210px] sm:min-h-[240px] flex items-end">
        <img
          src={HERO_FIELD_IMAGE}
          alt="Indian smallholder tomato and vegetable farm in morning sunlight"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0E2111]/90 via-[#0E2111]/45 to-transparent"
        />
        <div className="relative z-10 p-6 sm:p-8 max-w-2xl space-y-1.5 text-white">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-balance">
            {t.aboutTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#E2ECE0]">{t.aboutSubtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Credits Card */}
        <section className="bg-white rounded-3xl border border-[#DCE3D4] p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-lg text-[#132115]">
              {t.projectCardTitle}
            </h2>
          </div>

          <dl className="divide-y divide-[#DCE3D4]">
            <div className="py-3.5 flex items-start gap-3">
              <User className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <dt className="text-xs font-medium text-[#4C5C4E]">{t.createdByLabel}</dt>
                <dd className="font-display font-bold text-base text-[#132115] mt-0.5">
                  {t.createdByValue}
                </dd>
              </div>
            </div>

            <div className="py-3.5 flex items-start gap-3">
              <Building2
                className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs font-medium text-[#4C5C4E]">{t.instituteLabel}</dt>
                <dd className="font-display font-bold text-base text-[#132115] mt-0.5">
                  {t.instituteValue}
                </dd>
              </div>
            </div>

            <div className="py-3.5 flex items-start gap-3">
              <UserCheck
                className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs font-medium text-[#4C5C4E]">{t.trainerLabel}</dt>
                <dd className="font-display font-bold text-base text-[#132115] mt-0.5">
                  {t.trainerValue}
                </dd>
              </div>
            </div>
          </dl>
        </section>

        {/* Mission & Privacy */}
        <div className="space-y-4">
          <section className="bg-white rounded-3xl border border-[#DCE3D4] p-6 space-y-2.5">
            <h2 className="font-display font-bold text-lg text-[#132115]">
              {t.missionTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#364438] leading-relaxed">
              {t.missionBody}
            </p>
          </section>

          <section className="bg-white rounded-3xl border border-[#DCE3D4] p-6 space-y-2.5">
            <h2 className="font-display font-bold text-lg text-[#132115] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0" aria-hidden="true" />
              <span>{t.privacyTitle}</span>
            </h2>
            <p className="text-sm sm:text-base text-[#364438] leading-relaxed">
              {t.privacyBody}
            </p>
          </section>
        </div>
      </div>

      {/* Mandatory Safety Disclaimer */}
      <div className="rounded-2xl bg-[#EDF2E8] border border-[#DCE3D4] p-4 sm:p-5 flex items-start gap-3 text-sm text-[#364438]">
        <Info className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" aria-hidden="true" />
        <p>{t.disclaimerText}</p>
      </div>
    </div>
  );
}
