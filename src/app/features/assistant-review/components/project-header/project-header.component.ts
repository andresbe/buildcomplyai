import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { Project, Review } from '../../models/assistant-review.models';
import { UploadPlanButtonComponent } from '../upload-plan-button/upload-plan-button.component';

@Component({
  selector: 'app-project-header',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon, UploadPlanButtonComponent],
  template: `
    <header class="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div class="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>Projects</span>
            <span>/</span>
            <span>{{ project?.name }}</span>
            <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{{ review?.status }}</span>
          </div>
          <div class="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
            <div class="flex min-w-0 items-center gap-2">
              <h1 *ngIf="!isEditingTitle(); else titleInput" class="truncate text-2xl font-bold tracking-tight text-slate-950">
                {{ editableTitle() || review?.title }}
              </h1>

              <ng-template #titleInput>
                <input
                  #titleField
                  class="h-9 min-w-0 max-w-full border border-electric-500 bg-white px-3 text-2xl font-bold tracking-tight text-slate-950 outline-none ring-4 ring-blue-100"
                  style="border-radius: 8px; width: min(520px, 70vw);"
                  [value]="editableTitle() || review?.title"
                  (input)="editableTitle.set(titleField.value)"
                  (blur)="finishTitleEdit()"
                  (keydown.enter)="finishTitleEdit()"
                  (keydown.escape)="cancelTitleEdit()"
                  autofocus
                />
              </ng-template>

              <button
                type="button"
                class="bc-icon-button h-8 w-8 shrink-0"
                title="Edit title"
                (click)="startTitleEdit()"
              >
                <svg lucideIcon="pencil" size="15"></svg>
              </button>
            </div>
            <p class="pb-1 text-sm text-slate-500">Project ID: {{ project?.id }} · {{ review?.createdAt }}</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 xl:justify-end">
          <app-upload-plan-button />
          <button class="inline-flex h-10 items-center gap-2 border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 hover:border-electric-500 hover:text-electric-600" style="border-radius: 8px;">
            <svg lucideIcon="link" size="16"></svg>
            Switch Discipline
            <svg lucideIcon="chevron-down" size="16"></svg>
          </button>
          <button class="bc-icon-button relative" title="Notifications">
            <svg lucideIcon="bell" size="18"></svg>
            <span class="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-red-600 text-[10px] font-bold text-white">3</span>
          </button>
          <div class="grid h-10 w-10 place-items-center rounded-full bg-navy-950 text-sm font-bold text-white">AR</div>
        </div>
      </div>
    </header>
  `,
})
export class ProjectHeaderComponent {
  @Input({ required: true }) project?: Project;
  @Input({ required: true }) review?: Review;

  readonly isEditingTitle = signal(false);
  readonly editableTitle = signal('');

  startTitleEdit(): void {
    this.editableTitle.set(this.editableTitle() || this.review?.title || '');
    this.isEditingTitle.set(true);
  }

  finishTitleEdit(): void {
    const nextTitle = this.editableTitle().trim();
    this.editableTitle.set(nextTitle || this.review?.title || '');
    this.isEditingTitle.set(false);
  }

  cancelTitleEdit(): void {
    this.editableTitle.set(this.review?.title || '');
    this.isEditingTitle.set(false);
  }
}
