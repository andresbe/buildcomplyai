import { Component } from '@angular/core';
import { AssistantReviewPageComponent } from './features/assistant-review/assistant-review-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AssistantReviewPageComponent],
  template: '<app-assistant-review-page />',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'build-comply-ai';
}
