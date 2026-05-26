import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Finding, UploadedDocument } from '../../models/assistant-review.models';

@Component({
  selector: 'app-pdf-review-panel',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon, PdfViewerModule],
  template: `
    <section class="bc-card flex min-h-[620px] flex-col overflow-hidden">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <div class="flex items-center gap-3">
          <div class="grid h-10 w-10 place-items-center rounded-md bg-red-100 text-red-600">
            <svg lucideIcon="file-text" size="20"></svg>
          </div>
          <div>
            <h2 class="font-bold text-slate-950">{{ pdfPreviewName || document?.fileName }}</h2>
            <p class="text-sm text-slate-500">
              <span *ngIf="pdfPreviewUrl">PDF preview loaded from chat attachment</span>
              <span *ngIf="!pdfPreviewUrl">Page 1 of {{ document?.pages }} · Detected as {{ document?.detectedType }}</span>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="bc-icon-button" title="Search plan">
            <svg lucideIcon="search" size="17"></svg>
          </button>
          <button class="bc-icon-button" title="Fit to screen">
            <svg lucideIcon="maximize-2" size="17"></svg>
          </button>
          <button class="bc-icon-button" title="Download">
            <svg lucideIcon="download" size="17"></svg>
          </button>
          <button class="bc-icon-button" title="More actions">
            <svg lucideIcon="more-horizontal" size="17"></svg>
          </button>
        </div>
      </div>

      <div class="grid flex-1 grid-rows-[1fr_auto] bg-slate-100/60 p-4">
        <div class="relative min-h-[430px] overflow-hidden border border-slate-200 bg-white shadow-inner" style="border-radius: 8px;">
          <ng-container *ngIf="pdfPreviewUrl; else planPlaceholder">
            <pdf-viewer
              class="block h-[430px] w-full overflow-auto bg-slate-100"
              [src]="pdfPreviewUrl"
              [render-text]="true"
              [original-size]="false"
              [fit-to-page]="true"
              [show-all]="false"
              [page]="1"
              [zoom]="1"
              style="display: block;"
            />
          </ng-container>

          <ng-template #planPlaceholder>
            <div class="absolute inset-6 bg-[linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            <div class="absolute inset-8 border border-slate-300/70"></div>

            <div class="absolute left-[12%] top-[18%] h-px w-[72%] bg-slate-400/80"></div>
            <div class="absolute left-[14%] top-[44%] h-px w-[64%] bg-slate-400/80"></div>
            <div class="absolute left-[18%] top-[70%] h-px w-[58%] bg-slate-400/80"></div>
            <div class="absolute left-[24%] top-[13%] h-[70%] w-px bg-slate-400/80"></div>
            <div class="absolute left-[48%] top-[12%] h-[76%] w-px bg-slate-400/80"></div>
            <div class="absolute left-[70%] top-[16%] h-[65%] w-px bg-slate-400/80"></div>

            <div class="absolute left-[16%] top-[24%] text-[10px] font-semibold text-slate-500">OFFICE 205</div>
            <div class="absolute left-[39%] top-[31%] text-[10px] font-semibold text-slate-500">OPEN OFFICE</div>
            <div class="absolute left-[62%] top-[58%] text-[10px] font-semibold text-slate-500">CORRIDOR</div>

            <div class="absolute left-[42%] top-[20%] rounded border-2 border-dashed border-red-400 bg-red-50/60 px-14 py-8"></div>
            <div class="absolute left-[18%] top-[63%] rounded border-2 border-dashed border-red-400 bg-red-50/60 px-14 py-8"></div>

            <button
              *ngFor="let pin of visiblePins; let i = index"
              class="absolute grid h-8 w-8 place-items-center rounded-full text-sm font-bold text-white shadow-lg"
              [ngClass]="pin.riskLevel === 'High' ? 'bg-red-600' : pin.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-electric-600'"
              [style.left.%]="pinPositions[i].left"
              [style.top.%]="pinPositions[i].top"
              [title]="pin.title"
            >
              {{ i + 1 }}
            </button>
          </ng-template>
        </div>

        <div class="mt-4 flex items-center gap-2 overflow-x-auto">
          <button *ngFor="let doc of documents" class="min-w-24 border bg-white p-2 text-center text-xs text-slate-600" style="border-radius: 8px;" [class.border-electric-600]="doc.id === document?.id">
            <div class="mb-2 h-12 border border-slate-200 bg-slate-100"></div>
            {{ doc.sheet }}
          </button>
        </div>
      </div>

      <div class="border-t border-slate-200 bg-white px-5 py-4">
        <div class="grid grid-cols-4 gap-3 text-center">
          <div>
            <p class="text-xl font-bold text-slate-950">124</p>
            <p class="text-xs text-slate-500">Text Blocks</p>
          </div>
          <div>
            <p class="text-xl font-bold text-slate-950">8</p>
            <p class="text-xs text-slate-500">Tables</p>
          </div>
          <div>
            <p class="text-xl font-bold text-slate-950">47</p>
            <p class="text-xs text-slate-500">Symbols</p>
          </div>
          <div>
            <p class="text-xl font-bold text-slate-950">23</p>
            <p class="text-xs text-slate-500">Notes</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PdfReviewPanelComponent {
  @Input({ required: true }) document?: UploadedDocument;
  @Input({ required: true }) findings: Finding[] = [];
  @Input({ required: true }) documents: UploadedDocument[] = [];
  @Input() pdfPreviewUrl: string | null = null;
  @Input() pdfPreviewName: string | null = null;

  readonly pinPositions = [
    { left: 45, top: 23 },
    { left: 21, top: 68 },
    { left: 63, top: 43 },
  ];

  get visiblePins(): Finding[] {
    return this.findings.slice(0, 3);
  }
}
