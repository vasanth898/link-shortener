/**
 * Dashboard Component
 * 
 * Displays a list of all shortened URLs (mock data for now)
 * In a real application, this would fetch from a backend endpoint
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { UrlShortenerService } from '../../services/url-shortener.service';

interface DashboardLink {
    shortCode: string;
    shortUrl: string;
    longUrl: string;
    clickCount: number;
    createdDate: string;
    expiresAt: string;
    linkStatus: 'ACTIVE' | 'EXPIRED';
}

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    links: DashboardLink[] = [];
    isLoading: boolean = false;

    //constructor(private notificationService: NotificationService) { }

    constructor(
        private notificationService: NotificationService,
        private urlShortenerService: UrlShortenerService // <--- Add this
    ) { }

    ngOnInit(): void {
        this.isLoading = true; // <--- Set loading true
        this.urlShortenerService.getAllLinks().subscribe({
            next: (data) => {
                this.links = data;
                this.isLoading = false;
            },
            error: (error) => {
                this.notificationService.error('Failed to load links');
                this.isLoading = false;
            }
        });
    }

    // ngOnInit(): void {
    //     // In a real app, you would fetch links from the backend
    //     // For now, we'll show an empty state with instructions
    //     this.isLoading = false;
    // }

    /**
     * Copy URL to clipboard
     */
    copyToClipboard(text: string): void {
        navigator.clipboard.writeText(text).then(() => {
            this.notificationService.success('Copied to clipboard! 📋');
        }).catch(() => {
            this.notificationService.error('Failed to copy to clipboard');
        });
    }

    /**
     * Format date to readable string
     */
    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    /**
     * Check if link is expired
     */
    isExpired(expiresAt: string): boolean {
        return new Date(expiresAt) < new Date();
    }

    /**
     * Truncate long URLs for display
     */
    truncateUrl(url: string, maxLength: number = 50): string {
        if (url.length <= maxLength) return url;
        return url.substring(0, maxLength) + '...';
    }
}
