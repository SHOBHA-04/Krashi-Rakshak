export type Language = "en" | "hi";

export type AppTab = "scan" | "history" | "how" | "about";

export type DiagnosisStatus = "Healthy" | "Diseased" | "Unclear";

export type SeverityLevel = "Low" | "Medium" | "High";

export interface PlantAnalysisResult {
  crop_name: string;
  crop_name_hi?: string;
  status: DiagnosisStatus;
  disease_name: string;
  disease_name_hi?: string;
  confidence: number;
  severity: SeverityLevel;
  symptoms_observed: string[];
  symptoms_observed_hi?: string[];
  treatment: string[];
  treatment_hi?: string[];
  prevention_tips: string[];
  prevention_tips_hi?: string[];
  affected_area_description: string;
  affected_area_description_hi?: string;
  summary_hindi: string;
  summary_english: string;
}

export type FeedbackAnswer = "yes" | "no";

export interface ScanHistoryItem {
  id: string;
  timestamp: number;
  thumbnailDataUrl: string;
  result: PlantAnalysisResult;
  isDemo?: boolean;
  feedback?: FeedbackAnswer;
}

export interface DemoSample {
  id: string;
  imageUrl: string;
  labelEn: string;
  labelHi: string;
  subtitleEn: string;
  subtitleHi: string;
  result: PlantAnalysisResult;
}
