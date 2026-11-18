import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import type { Language, ScanHistoryItem } from "../types/plant";
import { TRANSLATIONS } from "../i18n/translations";

interface HistoryProps {
  language: Language;
  items: ScanHistoryItem[];
  onSelectItem: (item: ScanHistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onGoToScan: () => void;
}

/**
 * Displays up to 20 saved scans from localStorage with thumbnail,
 * diagnosis, date, confidence score, and delete/clear controls.
 */
export function History({
  language,
  items,
  onSelectItem,
  onDeleteItem,
  onClearAll,
  onGoToScan,
}: HistoryProps) {
  const t = TRANSLATIONS[language];
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#162218]">
            {t.historyTitle}
          </h1>
          <p className="text-sm text-[#526054] mt-1">{t.historySubtitle}</p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            {!confirmClear ? (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-white hover:bg-[#FEF2F2] text-[#991B1B] border border-[#E2E6DC] text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                <span>{t.historyClearAll}</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onClearAll();
                    setConfirmClear(false);
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#C62828] hover:bg-[#B71C1C] text-white text-sm font-semibold cursor-pointer"
                >
                  {t.historyConfirmClear}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-white text-[#162218] border border-[#E2E6DC] text-sm font-medium cursor-pointer"
                >
                  {t.historyCancel}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E2E6DC] p-8 sm:p-12 text-center space-y-4">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-[#F4F6F0] text-[#2E7D32] flex items-center justify-center">
            <Clock className="w-7 h-7" aria-hidden="true" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h2 className="font-display font-semibold text-lg text-[#162218]">
              {t.historyEmptyTitle}
            </h2>
            <p className="text-sm text-[#526054]">{t.historyEmptySubtitle}</p>
          </div>
          <button
            type="button"
            onClick={onGoToScan}
            className="min-h-[48px] px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-base inline-flex items-center justify-center cursor-pointer"
          >
            {t.navScan}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {items.map((item) => {
            const { result } = item;
            const crop =
              language === "hi" && result.crop_name_hi
                ? result.crop_name_hi
                : result.crop_name;
            const disease =
              language === "hi" && result.disease_name_hi
                ? result.disease_name_hi
                : result.disease_name;
            const dateStr = new Date(item.timestamp).toLocaleDateString(
              language === "hi" ? "hi-IN" : "en-IN",
              { day: "numeric", month: "short", year: "numeric" }
            );
            const isHealthy = result.status === "Healthy";
            const isHigh = !isHealthy && result.severity === "High";

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E2E6DC] p-3.5 flex items-center gap-3.5 hover:border-[#C2CCBA] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => onSelectItem(item)}
                  className="flex items-center gap-3.5 flex-1 min-w-0 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32] rounded-xl"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#EAECE4] shrink-0">
                    <img
                      src={item.thumbnailDataUrl}
                      alt={`${crop} — ${disease}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#526054]">
                      <span className="font-medium text-[#162218] truncate">{crop}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums shrink-0">{dateStr}</span>
                    </div>

                    <p className="font-display font-semibold text-base text-[#162218] truncate">
                      {disease}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          isHealthy
                            ? "text-[#2E7D32]"
                            : isHigh
                              ? "text-[#C62828]"
                              : "text-[#B45309]"
                        }`}
                      >
                        {isHealthy ? (
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : isHigh ? (
                          <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                        <span className="tabular-nums">
                          {result.confidence.toFixed(1)}%
                        </span>
                      </span>

                      {item.feedback && (
                        <>
                          <span aria-hidden="true" className="text-[#9AA69B]">
                            ·
                          </span>
                          <span className="text-[#526054]">
                            {item.feedback === "yes"
                              ? t.historyFeedbackYes
                              : t.historyFeedbackNo}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <ChevronRight
                    className="w-5 h-5 text-[#7B887D] shrink-0"
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteItem(item.id)}
                  aria-label={`${t.historyDelete}: ${disease}`}
                  className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-[#7B887D] hover:text-[#C62828] hover:bg-[#FEF2F2] transition-colors shrink-0 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
