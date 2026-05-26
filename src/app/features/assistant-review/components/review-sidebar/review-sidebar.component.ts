import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { Project, Review } from '../../models/assistant-review.models';

@Component({
  selector: 'app-review-sidebar',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  template: `
    <aside class="flex h-full w-[300px] flex-col bg-navy-950 text-white">
      <div class="border-b border-white/10 px-6 py-6">
        <div class="flex items-center gap-3">
          <div class="grid h-11 w-11 place-items-center rounded bg-electric-600">
            <svg lucideIcon="building-2" size="24"></svg>
          </div>
          <div>
            <p class="text-xl font-bold tracking-tight">BuildComply <span class="text-electric-400">AI</span></p>
            <p class="text-sm text-slate-300">AI-Powered Plan Review</p>
          </div>
        </div>
      </div>

      <nav class="space-y-1 px-4 py-5">
        <a class="flex items-center gap-3 rounded-md bg-electric-600 px-4 py-3 text-sm font-semibold shadow-lg shadow-electric-600/20">
          <svg lucideIcon="layout-dashboard" size="18"></svg>
          Dashboard
        </a>
        <a class="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10">
          <svg lucideIcon="folder" size="18"></svg>
          Projects
        </a>
        <a class="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10">
          <svg lucideIcon="clipboard-check" size="18"></svg>
          Reviews
        </a>
      </nav>

      <div class="min-h-0 flex-1 overflow-y-auto px-4">
        <div class="mb-3 mt-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Reviews
          <button class="bc-icon-button h-8 w-8 border-white/10 bg-white/5 text-white" title="Start new review">
            <svg lucideIcon="plus" size="16"></svg>
          </button>
        </div>

        <div class="space-y-2">
          <button
            *ngFor="let review of reviews"
            class="w-full border-l-2 px-4 py-3 text-left transition"
            style="border-radius: 8px;"
            [ngClass]="review.id === activeReviewId ? 'border-electric-500 bg-white/10' : 'border-transparent hover:bg-white/5'"
          >
            <p class="truncate text-sm font-semibold text-white">{{ review.title }}</p>
            <p class="mt-1 flex items-center gap-2 text-xs" [class.text-emerald-300]="review.status === 'Completed'" [class.text-electric-400]="review.status !== 'Completed'">
              <span class="h-2 w-2 rounded-full" [class.bg-emerald-400]="review.status === 'Completed'" [class.bg-electric-500]="review.status !== 'Completed'"></span>
              {{ review.status }}
            </p>
            <p class="mt-1 text-xs text-slate-400">{{ review.updatedAt }}</p>
          </button>
        </div>

        <div class="mt-6 border-t border-white/10 pt-5">
          <p class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Discipline Modules</p>
          <div class="space-y-1">
            <a class="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-white">
              <svg lucideIcon="zap" size="18"></svg>
              Electrical
            </a>
            <a class="flex items-center gap-3 rounded-md px-4 py-3 text-sm text-slate-200">
              <svg lucideIcon="layers" size="18"></svg>
              Plumbing
            </a>
            <a class="flex items-center gap-3 rounded-md px-4 py-3 text-sm text-slate-200">
              <svg lucideIcon="book-open" size="18"></svg>
              Code Library
            </a>
            <a class="flex items-center gap-3 rounded-md px-4 py-3 text-sm text-slate-200">
              <svg lucideIcon="settings" size="18"></svg>
              Settings
            </a>
          </div>
        </div>
      </div>

      <div class="space-y-4 border-t border-white/10 p-4">
        <div class="rounded-md border border-white/10 bg-white/5 p-4">
          <p class="text-xs text-slate-400">Current Code Set</p>
          <p class="mt-1 text-sm font-semibold">{{ activeProject?.codeSet }}</p>
          <p class="mt-1 text-xs text-slate-300">{{ activeProject?.jurisdiction }}</p>
        </div>
        <div class="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3">
          <div class="grid h-10 w-10 place-items-center rounded-full bg-slate-300/30 text-sm font-bold">AR</div>
          <div>
            <p class="text-sm font-semibold">Alex Ramirez</p>
            <p class="text-xs text-slate-300">Architect</p>
          </div>
        </div>
      </div>
    </aside>
  `,
})
export class ReviewSidebarComponent {
  @Input({ required: true }) projects: Project[] = [];
  @Input({ required: true }) reviews: Review[] = [];
  @Input({ required: true }) activeReviewId = '';

  get activeProject(): Project | undefined {
    const activeReview = this.reviews.find((review) => review.id === this.activeReviewId);
    return this.projects.find((project) => project.id === activeReview?.projectId);
  }
}
