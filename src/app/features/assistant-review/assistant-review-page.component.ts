import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ChatSubmitPayload } from './models/assistant-review.models';
import { AssistantReviewMockService } from './services/assistant-review-mock.service';
import { FindingsPanelComponent } from './components/findings-panel/findings-panel.component';
import { PdfReviewPanelComponent } from './components/pdf-review-panel/pdf-review-panel.component';
import { ProjectHeaderComponent } from './components/project-header/project-header.component';
import { ReviewChatComponent } from './components/review-chat/review-chat.component';
import { ReviewSidebarComponent } from './components/review-sidebar/review-sidebar.component';

@Component({
  selector: 'app-assistant-review-page',
  standalone: true,
  imports: [
    CommonModule,
    FindingsPanelComponent,
    PdfReviewPanelComponent,
    ProjectHeaderComponent,
    ReviewChatComponent,
    ReviewSidebarComponent,
  ],
  template: `
    <main class="h-screen overflow-hidden bg-slate-50 text-slate-950">
      <div class="flex h-full">
        <app-review-sidebar
          class="hidden h-full shrink-0 lg:block"
          [projects]="projects()"
          [reviews]="reviews()"
          [activeReviewId]="activeReview().id"
        />

        <section class="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
          <app-project-header [project]="activeProject()" [review]="activeReview()" />

          <div class="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-3 sm:p-4 xl:grid-cols-[minmax(360px,0.95fr)_minmax(400px,1.05fr)] 2xl:grid-cols-[minmax(430px,0.95fr)_minmax(500px,1.1fr)_minmax(360px,0.8fr)]">
            <app-review-chat
              class="min-h-[620px]"
              [messages]="messages()"
              (sendMessage)="addMessage($event)"
              (pdfSelected)="previewPdf($event)"
            />
            <app-pdf-review-panel
              [document]="document()"
              [findings]="findings()"
              [documents]="documents()"
              [pdfPreviewUrl]="pdfPreviewUrl()"
              [pdfPreviewName]="pdfPreviewName()"
            />
            <app-findings-panel class="xl:col-span-2 2xl:col-span-1" [findings]="findings()" />
          </div>
        </section>
      </div>
    </main>
  `,
})
export class AssistantReviewPageComponent {
  private readonly reviewData = inject(AssistantReviewMockService);

  readonly projects = this.reviewData.projects;
  readonly reviews = this.reviewData.reviews;
  readonly messages = this.reviewData.messages;
  readonly findings = this.reviewData.findings;
  readonly document = this.reviewData.uploadedDocument;
  readonly documents = this.reviewData.documents;
  readonly pdfPreviewUrl = this.reviewData.selectedPdfPreview;
  readonly pdfPreviewName = this.reviewData.selectedPdfName;

  readonly activeReview = computed(() => this.reviews()[0]);
  readonly activeProject = computed(() => this.projects().find((project) => project.id === this.activeReview().projectId) ?? this.projects()[0]);

  addMessage(payload: ChatSubmitPayload): void {
    this.reviewData.addUserMessage(payload.content);

    const pdfFile = payload.pdfFiles[0];
    if (!pdfFile) {
      this.reviewData.addAssistantMessage('Attach a PDF before sending it for evaluation.');
      return;
    }

    const loadingMessageId = this.reviewData.addAssistantMessage(`Evaluating ${pdfFile.name}...`);

    this.reviewData.evaluatePdf(pdfFile).subscribe({
      next: (response) => {
        this.reviewData.updateMessage(loadingMessageId, this.formatEvaluationResponse(response));
        this.reviewData.populateMockFindings();
      },
      error: () => {
        this.reviewData.updateMessage(
          loadingMessageId,
          'The PDF evaluation service could not be reached. Please try again in a moment.',
        );
      },
    });
  }

  previewPdf(file: File): void {
    this.reviewData.setSelectedPdfPreview(file);
  }

  private formatEvaluationResponse(response: unknown): string {
    if (typeof response === 'string') {
      return response;
    }

    if (response && typeof response === 'object') {
      const result = response as Record<string, unknown>;
      const summary = result['summary'] ?? result['result'] ?? result['message'] ?? result['evaluation'];

      if (typeof summary === 'string') {
        return summary;
      }

      return JSON.stringify(response, null, 2);
    }

    return 'Evaluation completed.';
  }
}
