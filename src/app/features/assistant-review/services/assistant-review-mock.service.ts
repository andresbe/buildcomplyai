import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage, Finding, Project, Review, UploadedDocument } from '../models/assistant-review.models';

@Injectable({ providedIn: 'root' })
export class AssistantReviewMockService {
  private readonly http = inject(HttpClient);
  private readonly evaluatorUrl = '/api/evaluator/evaluate';

  readonly projects = signal<Project[]>([
    {
      id: 'SV-2024-058',
      name: 'Sunset Villas - Unit B',
      jurisdiction: 'City of Fort Lauderdale',
      codeSet: 'Florida Building Code 8th Edition (2023)',
      owner: 'Alex Ramirez',
    },
    {
      id: 'MD-2024-041',
      name: 'Miami Duplex',
      jurisdiction: 'Miami-Dade County',
      codeSet: 'Florida Building Code 8th Edition (2023)',
      owner: 'Priya Shah',
    },
    {
      id: 'OV-2024-033',
      name: 'Ocean View Tower',
      jurisdiction: 'City of Miami Beach',
      codeSet: 'NEC 2020 + Florida Building Code 2023',
      owner: 'Morgan Lee',
    },
  ]);

  readonly reviews = signal<Review[]>([
    {
      id: 'REV-1001',
      projectId: 'SV-2024-058',
      title: 'Sunset Villas - Electrical',
      discipline: 'Electrical',
      status: 'In Progress',
      updatedAt: 'Updated just now',
      createdAt: 'Created May 18, 2024',
    },
    {
      id: 'REV-1002',
      projectId: 'MD-2024-041',
      title: 'Miami Duplex - Plumbing',
      discipline: 'Plumbing',
      status: 'Completed',
      updatedAt: '2 days ago',
      createdAt: 'Created May 16, 2024',
    },
    {
      id: 'REV-1003',
      projectId: 'OV-2024-033',
      title: 'Ocean View Tower - Electrical',
      discipline: 'Electrical',
      status: 'Completed',
      updatedAt: 'May 16, 2024',
      createdAt: 'Created May 12, 2024',
    },
    {
      id: 'REV-1004',
      projectId: 'SV-2024-058',
      title: 'Retail Center - Electrical',
      discipline: 'Electrical',
      status: 'In Progress',
      updatedAt: 'May 15, 2024',
      createdAt: 'Created May 14, 2024',
    },
  ]);

  readonly uploadedDocument = signal<UploadedDocument>({
    id: 'DOC-E20',
    fileName: 'E-2.0 Electrical Plan Level 2.pdf',
    sheet: 'E-2.0',
    pages: 14,
    size: '4.2 MB',
    detectedType: 'Floor Plan',
    status: 'Completed',
  });

  readonly documents = signal<UploadedDocument[]>([
    { id: 'DOC-0', fileName: 'E-0.0 Cover Sheet.pdf', sheet: 'E-0.0', pages: 1, size: '2.1 MB', detectedType: 'Cover Sheet', status: 'Completed' },
    { id: 'DOC-1', fileName: 'E-1.0 Electrical Plan Level 1.pdf', sheet: 'E-1.0', pages: 12, size: '3.8 MB', detectedType: 'Floor Plan', status: 'Completed' },
    { id: 'DOC-2', fileName: 'E-2.0 Electrical Plan Level 2.pdf', sheet: 'E-2.0', pages: 14, size: '4.2 MB', detectedType: 'Floor Plan', status: 'Completed' },
    { id: 'DOC-3', fileName: 'E-3.0 Electrical Details.pdf', sheet: 'E-3.0', pages: 8, size: '2.7 MB', detectedType: 'Details', status: 'Pending' },
    { id: 'DOC-4', fileName: 'E-4.0 Panel Schedules.pdf', sheet: 'E-4.0', pages: 6, size: '1.9 MB', detectedType: 'Schedule', status: 'Pending' },
  ]);

  readonly findings = signal<Finding[]>([]);

  private readonly mockFindings: Finding[] = [
    {
      id: 'HR-001',
      title: 'Panel schedule not detected',
      summary: 'A panel schedule with load information is required.',
      riskLevel: 'High',
      category: 'Power Distribution',
      codeReference: 'NEC 408.4',
      location: 'E-2.0 (Page 1)',
      sheet: 'E-2.0',
      page: 1,
      status: 'Open',
      recommendation: 'Provide a panel schedule that includes panel name, voltage, main breaker size, AIC rating, and a complete circuit directory with loads.',
    },
    {
      id: 'HR-002',
      title: 'Load calculations not found',
      summary: 'Service and feeder load calculations are required.',
      riskLevel: 'High',
      category: 'Load Calculations',
      codeReference: 'NEC 220.87',
      location: '-',
      sheet: '-',
      page: null,
      status: 'Open',
      recommendation: 'Add load calculations for service, feeder, continuous loads, and demand factors before submission.',
    },
    {
      id: 'HR-003',
      title: 'Emergency disconnect not identified',
      summary: 'Emergency disconnect for service is not clearly shown.',
      riskLevel: 'High',
      category: 'Life Safety',
      codeReference: 'NEC 230.85',
      location: 'E-1.0 (Page 2)',
      sheet: 'E-1.0',
      page: 2,
      status: 'Open',
      recommendation: 'Label the service emergency disconnect and ensure it is plainly marked at the exterior service location.',
    },
    {
      id: 'MR-001',
      title: 'GFCI protection not clearly indicated',
      summary: 'GFCI protection for receptacles in offices and break room is unclear.',
      riskLevel: 'Medium',
      category: 'Receptacles',
      codeReference: 'NEC 210.8(A)',
      location: 'E-2.0 (Page 1)',
      sheet: 'E-2.0',
      page: 1,
      status: 'Open',
      recommendation: 'Clarify GFCI protected receptacles with tags, notes, or circuit references for all required areas.',
    },
    {
      id: 'MR-002',
      title: 'Missing grounding electrode conductor details',
      summary: 'Grounding electrode conductor size and type are missing.',
      riskLevel: 'Medium',
      category: 'Grounding',
      codeReference: 'NEC 250.66',
      location: 'E-3.0 (Page 4)',
      sheet: 'E-3.0',
      page: 4,
      status: 'Open',
      recommendation: 'Add grounding electrode conductor material, size, connection method, and grounding electrode system details.',
    },
    {
      id: 'LR-001',
      title: 'Fixture schedule note needs confirmation',
      summary: 'Lighting fixture notes are readable, but manufacturer cut sheets are not attached.',
      riskLevel: 'Low',
      category: 'Lighting',
      codeReference: 'FBC Energy C405',
      location: 'E-4.0 (Page 1)',
      sheet: 'E-4.0',
      page: 1,
      status: 'Open',
      recommendation: 'Attach fixture documentation or confirm it will be submitted during product approval review.',
    },
  ];

  populateMockFindings(): void {
    this.findings.set(this.mockFindings);
  }

  readonly messages = signal<ChatMessage[]>([]);
  readonly selectedPdfPreview = signal<string | null>(null);
  readonly selectedPdfName = signal<string | null>(null);

  private selectedPdfObjectUrl: string | null = null;

  addUserMessage(content: string): void {
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    this.messages.update((messages) => [
      ...messages,
      {
        id: `MSG-${Date.now()}`,
        role: 'user',
        author: 'Alex Ramirez',
        content: trimmed,
        time: new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }).format(new Date()),
      },
    ]);
  }

  addAssistantMessage(content: string): string {
    const id = `MSG-${Date.now()}`;

    this.messages.update((messages) => [
      ...messages,
      {
        id,
        role: 'assistant',
        author: 'BuildComply AI Assistant',
        content,
        time: new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }).format(new Date()),
      },
    ]);

    return id;
  }

  updateMessage(messageId: string, content: string): void {
    this.messages.update((messages) =>
      messages.map((message) => (message.id === messageId ? { ...message, content } : message)),
    );
  }

  evaluatePdf(file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<unknown>(this.evaluatorUrl, formData);
  }

  setSelectedPdfPreview(file: File): void {
    if (this.selectedPdfObjectUrl) {
      URL.revokeObjectURL(this.selectedPdfObjectUrl);
    }

    this.selectedPdfObjectUrl = URL.createObjectURL(file);
    this.selectedPdfPreview.set(this.selectedPdfObjectUrl);
    this.selectedPdfName.set(file.name);
  }
}
