/**
 * TypeScript Interfaces/Models for Link Shortener
 * 
 * These interfaces define the data structures used throughout the application
 * and match the backend API response formats
 */

/**
 * Request payload for shortening a URL
 */
export interface ShortenRequest {
    longUrl: string;
}

/**
 * Response from the shorten URL endpoint
 */
export interface ShortenResponse {
    shortCode: string;
    shortUrl: string;
    expiresAt: string;  // ISO date string
    clickCount: number;
    createdDate: string; // ISO date string
}

/**
 * Extended URL mapping with additional details
 * Used for displaying link information in the dashboard
 */
export interface UrlMapping {
    id?: number;
    shortCode: string;
    shortUrl: string;
    longUrl: string;
    expiresAt: string;
    createdDate: string;
    clickCount: number;
    linkStatus: 'ACTIVE' | 'EXPIRED';
}

/**
 * Notification message structure for toast notifications
 */
export interface NotificationMessage {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number; // milliseconds
}
