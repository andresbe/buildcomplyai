export type RiskLevel = 'High' | 'Medium' | 'Low';
export type ReviewStatus = 'In Progress' | 'Completed' | 'Pending';
export type ChatRole = 'assistant' | 'user';

export interface Project {
  id: string;
  name: string;
  jurisdiction: string;
  codeSet: string;
  owner: string;
}

export interface Review {
  id: string;
  projectId: string;
  title: string;
  discipline: string;
  status: ReviewStatus;
  updatedAt: string;
  createdAt: string;
}

export interface ChatMetric {
  label: string;
  value: number;
  tone: 'danger' | 'warning' | 'info';
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  author: string;
  content: string;
  time: string;
  metrics?: ChatMetric[];
  actionLabel?: string;
}

export interface Finding {
  id: string;
  title: string;
  summary: string;
  riskLevel: RiskLevel;
  category: string;
  codeReference: string;
  location: string;
  sheet: string;
  page: number | null;
  status: 'Open' | 'Resolved';
  recommendation: string;
}

export interface UploadedDocument {
  id: string;
  fileName: string;
  sheet: string;
  pages: number;
  size: string;
  detectedType: string;
  status: ReviewStatus;
}

export interface ChatSubmitPayload {
  content: string;
  pdfFiles: File[];
}
