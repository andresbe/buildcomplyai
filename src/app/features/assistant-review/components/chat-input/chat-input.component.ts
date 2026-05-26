import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideDynamicIcon } from '@lucide/angular';
import { ChatSubmitPayload } from '../../models/assistant-review.models';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideDynamicIcon],
  template: `
    <form class="border-t border-slate-200 bg-white p-4" (ngSubmit)="submit()">
      <input
        #pdfInput
        class="hidden"
        type="file"
        accept="application/pdf,.pdf"
        multiple
        (change)="attachPdfFiles($event)"
      />

      <div class="flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 focus-within:border-electric-500 focus-within:ring-4 focus-within:ring-blue-100" style="border-radius: 8px;">
        <button
          type="button"
          class="bc-icon-button h-8 w-8 shrink-0 border-0 bg-slate-50"
          title="Attach PDF"
          (click)="pdfInput.click()"
        >
          <svg lucideIcon="paperclip" size="16"></svg>
        </button>
        <input
          name="message"
          class="h-10 min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          placeholder="Ask anything about your plans..."
          autocomplete="off"
          [ngModel]="draft()"
          (ngModelChange)="draft.set($event)"
        />
        <button type="submit" class="grid h-9 w-9 shrink-0 place-items-center bg-electric-600 text-white hover:bg-electric-500" style="border-radius: 8px;" title="Send message">
          <svg lucideIcon="send" size="17"></svg>
        </button>
      </div>

      <div *ngIf="attachedPdfs().length > 0" class="mt-3 flex flex-wrap gap-2">
        <span
          *ngFor="let file of attachedPdfs(); let index = index"
          class="inline-flex max-w-full items-center gap-2 border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-slate-700"
          style="border-radius: 8px;"
        >
          <svg lucideIcon="file-text" class="shrink-0 text-electric-600" size="14"></svg>
          <span class="truncate">{{ file.name }}</span>
          <button
            type="button"
            class="ml-1 text-slate-400 transition hover:text-red-600"
            title="Remove PDF"
            (click)="removeAttachedPdf(index)"
          >
            x
          </button>
        </span>
      </div>

      <p class="mt-2 text-center text-xs text-slate-500">BuildComply AI can make mistakes. Please verify important information.</p>
    </form>
  `,
})
export class ChatInputComponent {
  @Output() sendMessage = new EventEmitter<ChatSubmitPayload>();
  @Output() pdfSelected = new EventEmitter<File>();
  readonly draft = signal('');
  readonly attachedPdfs = signal<File[]>([]);

  attachPdfFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []).filter((file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'));

    if (files.length > 0) {
      this.attachedPdfs.update((currentFiles) => [...currentFiles, ...files]);
      this.pdfSelected.emit(files[0]);
    }

    input.value = '';
  }

  removeAttachedPdf(index: number): void {
    this.attachedPdfs.update((files) => files.filter((_, fileIndex) => fileIndex !== index));
  }

  submit(): void {
    const content = this.draft().trim();
    const attachedFiles = this.attachedPdfs();

    if (!content && attachedFiles.length === 0) {
      return;
    }

    const attachmentSummary = attachedFiles.length
      ? `${attachedFiles.length === 1 ? 'Attached PDF' : 'Attached PDFs'}: ${attachedFiles.map((file) => file.name).join(', ')}`
      : '';

    this.sendMessage.emit({
      content: [content, attachmentSummary].filter(Boolean).join('\n'),
      pdfFiles: attachedFiles,
    });
    this.draft.set('');
    this.attachedPdfs.set([]);
  }
}
