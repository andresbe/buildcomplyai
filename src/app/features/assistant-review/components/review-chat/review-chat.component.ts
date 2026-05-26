import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { ChatMessage, ChatSubmitPayload } from '../../models/assistant-review.models';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-review-chat',
  standalone: true,
  imports: [CommonModule, LucideDynamicIcon, ChatInputComponent, ChatMessageComponent],
  template: `
    <section class="bc-card flex min-h-full flex-col overflow-hidden">
      <div class="border-b border-slate-200 px-5 py-4">
        <div class="flex items-center gap-3">
          <div class="grid h-11 w-11 place-items-center rounded-full bg-electric-600 text-white">
            <svg lucideIcon="sparkles" size="22"></svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-slate-950">BuildComply AI Assistant</h2>
            <p class="text-sm text-slate-500">Ask questions about plans, code requirements, and findings.</p>
          </div>
        </div>
      </div>

      <div class="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-white to-slate-50 px-4 py-5">
        <div *ngIf="messages.length === 0" class="flex h-full min-h-[360px] items-center justify-center">
          <div class="max-w-sm text-center">
            <div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-electric-600">
              <svg lucideIcon="sparkles" size="22"></svg>
            </div>
            <h3 class="mt-4 text-base font-bold text-slate-950">Start a plan review conversation</h3>
            <p class="mt-2 text-sm leading-6 text-slate-500">Ask BuildComply AI to review the uploaded plans, explain a code issue, or summarize the current findings.</p>
          </div>
        </div>
        <app-chat-message *ngFor="let message of messages" [message]="message" />
      </div>

      <app-chat-input
        (sendMessage)="sendMessage.emit($event)"
        (pdfSelected)="pdfSelected.emit($event)"
      />
    </section>
  `,
})
export class ReviewChatComponent {
  @Input({ required: true }) messages: ChatMessage[] = [];
  @Output() sendMessage = new EventEmitter<ChatSubmitPayload>();
  @Output() pdfSelected = new EventEmitter<File>();
}
