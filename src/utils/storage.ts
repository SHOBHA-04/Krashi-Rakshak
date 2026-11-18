import type { FeedbackAnswer, Language, ScanHistoryItem } from "../types/plant";

const HISTORY_KEY = "krishirakshak_history_v1";
const FEEDBACK_KEY = "krishirakshak_feedback_v1";
const LANG_KEY = "krishirakshak_lang_v1";
const MAX_HISTORY_ITEMS = 20;

export function loadLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    return saved === "hi" ? "hi" : "en";
  } catch {
    return "en";
  }
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // Ignore storage quota errors
  }
}

export function loadHistory(): ScanHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ScanHistoryItem[]) : [];
  } catch {
    return [];
  }
}

export function saveScanToHistory(item: ScanHistoryItem): ScanHistoryItem[] {
  const current = loadHistory().filter((existing) => existing.id !== item.id);
  const updated = [item, ...current].slice(0, MAX_HISTORY_ITEMS);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // If localStorage is full, trim older entries and retry once
    const trimmed = updated.slice(0, 10);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
      return trimmed;
    } catch {
      return updated;
    }
  }
  return updated;
}

export function deleteHistoryItem(id: string): ScanHistoryItem[] {
  const updated = loadHistory().filter((item) => item.id !== id);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
  return updated;
}

export function clearHistory(): ScanHistoryItem[] {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // Ignore
  }
  return [];
}

export interface FeedbackRecord {
  scanId: string;
  answer: FeedbackAnswer;
  cropName: string;
  diseaseName: string;
  timestamp: number;
}

export function saveFarmerFeedback(record: FeedbackRecord): ScanHistoryItem[] {
  try {
    const existingRaw = localStorage.getItem(FEEDBACK_KEY);
    const existing: FeedbackRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
    const filtered = Array.isArray(existing)
      ? existing.filter((entry) => entry.scanId !== record.scanId)
      : [];
    const updatedFeedback = [record, ...filtered].slice(0, 50);
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updatedFeedback));
  } catch {
    // Ignore storage errors
  }

  // Also attach feedback onto matching history entry so history list displays it
  const history = loadHistory().map((item) =>
    item.id === record.scanId ? { ...item, feedback: record.answer } : item
  );
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Ignore
  }
  return history;
}
