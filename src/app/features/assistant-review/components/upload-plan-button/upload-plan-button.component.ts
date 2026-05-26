import { Component, ElementRef, ViewChild } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';

@Component({
  selector: 'app-upload-plan-button',
  standalone: true,
  imports: [LucideDynamicIcon],
  template: `
    <input #fileInput class="hidden" type="file" accept="application/pdf" multiple (change)="handleFileSelection($event)" />
    <button
      type="button"
      class="inline-flex h-10 items-center gap-2 bg-electric-600 px-4 text-sm font-semibold text-white shadow-lg shadow-electric-600/20 transition hover:bg-electric-500"
      style="border-radius: 8px;"
      (click)="fileInput.click()"
    >
      <svg lucideIcon="upload" size="16"></svg>
      Upload PDF
    </button>
  `,
})
export class UploadPlanButtonComponent {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  handleFileSelection(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = '';
  }
}
