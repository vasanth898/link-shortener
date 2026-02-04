/**
 * Notification Component
 * 
 * Displays toast notifications at the top of the screen
 * Automatically subscribes to the notification service and shows messages
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { NotificationMessage } from '../../models/url-mapping.model';

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="notification-container">
      <div 
        *ngFor="let notification of notifications" 
        class="notification notification-{{notification.type}} fade-in"
        [@slideDown]>
        <span class="notification-icon">{{ getIcon(notification.type) }}</span>
        <span class="notification-message">{{ notification.message }}</span>
      </div>
    </div>
  `,
    styles: [`
    .notification-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    }

    .notification {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-radius: var(--radius-md);
      background: white;
      box-shadow: var(--shadow-xl);
      border-left: 4px solid;
      min-width: 300px;
      animation: slideIn 0.3s ease-out;
    }

    .notification-success {
      border-left-color: var(--success-color);
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(255, 255, 255, 1));
    }

    .notification-error {
      border-left-color: var(--error-color);
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(255, 255, 255, 1));
    }

    .notification-warning {
      border-left-color: var(--warning-color);
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(255, 255, 255, 1));
    }

    .notification-info {
      border-left-color: var(--primary-color);
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(255, 255, 255, 1));
    }

    .notification-icon {
      font-size: 24px;
      line-height: 1;
    }

    .notification-message {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .notification-container {
        right: 10px;
        left: 10px;
        max-width: none;
      }

      .notification {
        min-width: auto;
      }
    }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
    notifications: NotificationMessage[] = [];
    private subscription?: Subscription;

    constructor(private notificationService: NotificationService) { }

    ngOnInit(): void {
        // Subscribe to notifications from the service
        this.subscription = this.notificationService.notifications$.subscribe(
            (notification) => {
                // Add notification to the list
                this.notifications.push(notification);

                // Auto-remove notification after duration
                setTimeout(() => {
                    this.removeNotification(notification);
                }, notification.duration || 3000);
            }
        );
    }

    ngOnDestroy(): void {
        // Clean up subscription when component is destroyed
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    /**
     * Remove a notification from the list
     */
    private removeNotification(notification: NotificationMessage): void {
        const index = this.notifications.indexOf(notification);
        if (index > -1) {
            this.notifications.splice(index, 1);
        }
    }

    /**
     * Get the appropriate icon emoji for each notification type
     */
    getIcon(type: string): string {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '📢';
        }
    }
}
