import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { Finding } from '../../models/assistant-review.models';

@Component({
  selector: 'app-finding-card',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  template: `
    <article class="border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50">
      <div class="flex gap-3">
        <div
          class="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
          [ngClass]="finding.riskLevel === 'High' ? 'bg-red-600' : finding.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-electric-600'"
        >
          {{ finding.id.split('-')[1] }}
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-sm font-bold text-slate-950">{{ finding.title }}</h3>
            <span
              class="shrink-0 rounded px-2 py-1 text-xs font-semibold"
              [ngClass]="finding.riskLevel === 'High' ? 'bg-red-100 text-red-700' : finding.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-electric-600'"
            >
              {{ finding.riskLevel }}
            </span>
          </div>
          <p class="mt-1 text-sm leading-5 text-slate-600">{{ finding.summary }}</p>
          <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span>{{ finding.codeReference }}</span>
            <span>{{ finding.category }}</span>
            <span>{{ finding.location }}</span>
          </div>
        </div>
        <svg lucideIcon="chevron-right" class="mt-1 shrink-0 text-slate-400" size="18"></svg>
      </div>
    </article>
  `,
})
export class FindingCardComponent {
  @Input({ required: true }) finding!: Finding;
}
