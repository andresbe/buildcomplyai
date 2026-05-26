import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { Finding, RiskLevel } from '../../models/assistant-review.models';
import { FindingCardComponent } from '../finding-card/finding-card.component';

@Component({
  selector: 'app-findings-panel',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon, FindingCardComponent],
  template: `
    <section class="flex min-h-[620px] flex-col gap-4">
      <div class="bc-card overflow-hidden">
        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 class="text-lg font-bold text-slate-950">Detected Issues <span class="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">AI</span></h2>
            <p class="text-sm text-slate-500">{{ findings.length > 0 ? findings.length + ' findings require reviewer attention' : 'No evaluation has been submitted yet' }}</p>
          </div>
          <button *ngIf="findings.length > 0" class="bc-icon-button" title="Filter findings">
            <svg lucideIcon="filter" size="17"></svg>
          </button>
        </div>

        <ng-container *ngIf="findings.length > 0; else emptyDetectedIssues">
          <div class="grid grid-cols-2 gap-3 border-b border-slate-200 p-4">
            <div class="border border-red-100 bg-red-50 p-3" style="border-radius: 8px;">
              <p class="text-xs font-semibold text-red-600">High Risk</p>
              <p class="mt-1 text-2xl font-bold text-slate-950">{{ count('High') }}</p>
            </div>
            <div class="border border-amber-100 bg-amber-50 p-3" style="border-radius: 8px;">
              <p class="text-xs font-semibold text-amber-600">Medium Risk</p>
              <p class="mt-1 text-2xl font-bold text-slate-950">{{ count('Medium') }}</p>
            </div>
            <div class="border border-blue-100 bg-blue-50 p-3" style="border-radius: 8px;">
              <p class="text-xs font-semibold text-electric-600">Low / Notes</p>
              <p class="mt-1 text-2xl font-bold text-slate-950">{{ count('Low') }}</p>
            </div>
            <div class="border border-emerald-100 bg-emerald-50 p-3" style="border-radius: 8px;">
              <p class="text-xs font-semibold text-emerald-600">Passed Checks</p>
              <p class="mt-1 text-2xl font-bold text-slate-950">18</p>
            </div>
          </div>

          <div class="border-b border-slate-200 p-4">
            <div class="flex items-center gap-2 border border-slate-200 px-3 py-2 text-sm text-slate-500" style="border-radius: 8px;">
              <svg lucideIcon="search" size="16"></svg>
              Search findings...
            </div>
          </div>

          <div class="max-h-[470px] overflow-y-auto">
            <div class="border-b border-red-100 bg-red-50/60 px-5 py-3 text-sm font-bold text-red-600">High Risk ({{ count('High') }})</div>
            <app-finding-card *ngFor="let finding of byRisk('High')" [finding]="finding" />
            <div class="border-y border-amber-100 bg-amber-50/60 px-5 py-3 text-sm font-bold text-amber-600">Medium Risk ({{ count('Medium') }})</div>
            <app-finding-card *ngFor="let finding of byRisk('Medium')" [finding]="finding" />
            <div class="border-y border-blue-100 bg-blue-50/60 px-5 py-3 text-sm font-bold text-electric-600">Low Risk / Notes ({{ count('Low') }})</div>
            <app-finding-card *ngFor="let finding of byRisk('Low')" [finding]="finding" />
          </div>
        </ng-container>

        <ng-template #emptyDetectedIssues>
          <div class="flex min-h-[360px] items-center justify-center px-6 py-10 text-center">
            <div class="max-w-xs">
              <div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400">
                <svg lucideIcon="shield-check" size="22"></svg>
              </div>
              <h3 class="mt-4 text-sm font-bold text-slate-950">No detected issues yet</h3>
              <p class="mt-2 text-sm leading-6 text-slate-500">Attach a PDF and send it through the assistant to generate detected issues.</p>
            </div>
          </div>
        </ng-template>
      </div>

      <div class="bc-card p-5">
        <ng-container *ngIf="primaryFinding as detail">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="font-bold text-slate-950">Finding Details</h3>
            <span class="text-xs font-semibold text-slate-500">ID: {{ detail.id }}</span>
          </div>
          <div class="rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-700">High Risk</div>
          <h4 class="mt-3 text-lg font-bold text-slate-950">{{ detail.title }}</h4>
          <p class="mt-2 text-sm leading-6 text-slate-600">{{ detail.summary }}</p>
          <dl class="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt class="text-slate-500">Code Reference</dt>
              <dd class="font-semibold text-slate-900">{{ detail.codeReference }}</dd>
            </div>
            <div>
              <dt class="text-slate-500">Location</dt>
              <dd class="font-semibold text-slate-900">{{ detail.location }}</dd>
            </div>
          </dl>
          <p class="mt-4 text-sm font-semibold text-slate-900">Recommendation</p>
          <p class="mt-1 text-sm leading-6 text-slate-600">{{ detail.recommendation }}</p>
          <button class="mt-4 inline-flex items-center gap-2 border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-electric-600" style="border-radius: 8px;">
            View on Plan
            <svg lucideIcon="external-link" size="15"></svg>
          </button>
        </ng-container>

        <div *ngIf="!primaryFinding" class="flex min-h-[260px] items-center justify-center text-center">
          <div class="max-w-xs">
            <h3 class="font-bold text-slate-950">Finding Details</h3>
            <p class="mt-2 text-sm leading-6 text-slate-500">Details will appear after an evaluation finds an issue.</p>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class FindingsPanelComponent {
  @Input({ required: true }) findings: Finding[] = [];

  count(risk: RiskLevel): number {
    return this.findings.filter((finding) => finding.riskLevel === risk).length;
  }

  byRisk(risk: RiskLevel): Finding[] {
    return this.findings.filter((finding) => finding.riskLevel === risk);
  }

  get primaryFinding(): Finding | undefined {
    return this.findings[0];
  }
}
