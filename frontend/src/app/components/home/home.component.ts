/**
 * Home Component
 * 
 * Main page with URL shortening form
 * Users can enter a long URL and get a shortened version
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlShortenerService } from '../../services/url-shortener.service';
import { NotificationService } from '../../services/notification.service';
import { ShortenResponse } from '../../models/url-mapping.model';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    // Form input
    longUrl: string = '';

    // State management
    isLoading: boolean = false;
    shortenedResult: ShortenResponse | null = null;

    constructor(
        private urlShortenerService: UrlShortenerService,
        private notificationService: NotificationService
    ) { }

    /**
     * Submit the form to shorten a URL
     */
    onSubmit(): void {
        // Validate input
        if (!this.longUrl.trim()) {
            this.notificationService.warning('Please enter a URL to shorten');
            return;
        }

        // Basic URL validation
        if (!this.isValidUrl(this.longUrl)) {
            this.notificationService.error('Please enter a valid URL (must start with http:// or https://)');
            return;
        }

        // Set loading state
        this.isLoading = true;
        this.shortenedResult = null;

        // Call the API to shorten the URL
        this.urlShortenerService.shortenUrl(this.longUrl).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.shortenedResult = response;
                this.notificationService.success('URL shortened successfully! 🎉');
            },
            error: (error) => {
                this.isLoading = false;
                this.notificationService.error(error.message);
            }
        });
    }

    /**
     * Copy the shortened URL to clipboard
     */
    copyToClipboard(text: string): void {
        navigator.clipboard.writeText(text).then(() => {
            this.notificationService.success('Copied to clipboard! 📋');
        }).catch(() => {
            this.notificationService.error('Failed to copy to clipboard');
        });
    }

    /**
     * Basic URL validation
     */
    private isValidUrl(url: string): boolean {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    }

    /**
     * Get time remaining until expiration
     */
    getTimeRemaining(expiresAt: string): string {
        const now = new Date();
        const expiry = new Date(expiresAt);
        const diff = expiry.getTime() - now.getTime();

        if (diff <= 0) {
            return 'Expired';
        }

        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        return `${minutes}m ${seconds}s`;
    }

    /**
     * Format date to readable string
     */
    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    /**
     * Reset the form
     */
    reset(): void {
        this.longUrl = '';
        this.shortenedResult = null;
    }
}
