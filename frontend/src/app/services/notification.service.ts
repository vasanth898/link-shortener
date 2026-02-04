/**
 * Notification Service
 * 
 * Manages toast notifications for success, error, warning, and info messages
 * Uses a Subject to emit notifications that components can subscribe to
 */
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotificationMessage } from '../models/url-mapping.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    // Subject to emit notifications
    private notificationSubject = new Subject<NotificationMessage>();

    /**
     * Observable that components can subscribe to for receiving notifications
     */
    public notifications$: Observable<NotificationMessage> = this.notificationSubject.asObservable();

    /**
     * Show a success notification
     * 
     * @param message - The success message to display
     * @param duration - How long to show the notification (default: 3000ms)
     */
    success(message: string, duration: number = 3000): void {
        this.show({
            type: 'success',
            message,
            duration
        });
    }

    /**
     * Show an error notification
     * 
     * @param message - The error message to display
     * @param duration - How long to show the notification (default: 5000ms)
     */
    error(message: string, duration: number = 5000): void {
        this.show({
            type: 'error',
            message,
            duration
        });
    }

    /**
     * Show a warning notification
     * 
     * @param message - The warning message to display
     * @param duration - How long to show the notification (default: 4000ms)
     */
    warning(message: string, duration: number = 4000): void {
        this.show({
            type: 'warning',
            message,
            duration
        });
    }

    /**
     * Show an info notification
     * 
     * @param message - The info message to display
     * @param duration - How long to show the notification (default: 3000ms)
     */
    info(message: string, duration: number = 3000): void {
        this.show({
            type: 'info',
            message,
            duration
        });
    }

    /**
     * Emit a notification to all subscribers
     * 
     * @param notification - The notification object to emit
     */
    private show(notification: NotificationMessage): void {
        this.notificationSubject.next(notification);
    }
}
