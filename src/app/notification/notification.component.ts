// src/app/notification/notification.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div *ngIf="notification$ | async as notification" class="toast show position-fixed top-0 end-0 m-3" [ngClass]="notification.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'" role="alert">
      <div class="toast-body">{{ notification.message }}</div>
    </div>
  `,
  styles: [`.toast { z-index: 10000; }`]
})
export class NotificationComponent {
  notification$: NotificationService['notification$'];

  constructor(private notificationService: NotificationService) {
    this.notification$ = this.notificationService.notification$;
  }
}