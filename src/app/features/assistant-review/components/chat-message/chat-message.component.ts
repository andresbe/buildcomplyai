import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { ChatMessage } from '../../models/assistant-review.models';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon],
  template: `
    <article class="flex gap-3" [class.justify-end]="message.role === 'user'">
      <div *ngIf="message.role === 'assistant'" class="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-electric-600 text-white">
        <svg lucideIcon="bot" size="17"></svg>
      </div>

      <div class="max-w-[86%]">
        <div
          class="border px-4 py-3 text-sm leading-6 shadow-sm"
          style="border-radius: 8px;"
          [ngClass]="message.role === 'user' ? 'border-blue-200 bg-blue-50 text-slate-900' : 'border-slate-200 bg-white text-slate-800'"
        >
          <p class="whitespace-pre-line">{{ message.content }}</p>

          <div *ngIf="message.metrics?.length" class="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div
              *ngFor="let metric of message.metrics"
              class="border border-slate-200 bg-white p-3 text-center"
              style="border-radius: 8px;"
            >
              <p class="text-2xl font-bold text-slate-950">{{ metric.value }}</p>
              <p
                class="text-xs font-semibold"
                [ngClass]="{
                  'text-red-600': metric.tone === 'danger',
                  'text-amber-600': metric.tone === 'warning',
                  'text-electric-600': metric.tone === 'info'
                }"
              >
                {{ metric.label }}
              </p>
            </div>
          </div>

          <button
            *ngIf="message.actionLabel"
            class="mt-4 flex w-full items-center justify-between border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-electric-600 hover:border-electric-500"
            style="border-radius: 8px;"
          >
            {{ message.actionLabel }}
            <svg lucideIcon="chevron-right" size="18"></svg>
          </button>
        </div>
        <p class="mt-1 text-xs text-slate-500" [class.text-right]="message.role === 'user'">{{ message.time }}</p>
      </div>
    </article>
  `,
})
export class ChatMessageComponent {
  @Input({ required: true }) message!: ChatMessage;
}
