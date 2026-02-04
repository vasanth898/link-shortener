/**
 * URL Shortener Service
 * 
 * Handles all HTTP communication with the Spring Boot backend API
 * Base URL: http://localhost:8082/api/url
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShortenRequest, ShortenResponse } from '../models/url-mapping.model';

@Injectable({
    providedIn: 'root'
})
export class UrlShortenerService {
    // Backend API base URL
    private apiUrl = 'http://localhost:8082/api/url';

    constructor(private http: HttpClient) { }

    /**
     * Shorten a long URL by calling the backend API
     * 
     * @param longUrl - The long URL to shorten
     * @returns Observable of the shortened URL response
     */
    shortenUrl(longUrl: string): Observable<ShortenResponse> {
        const request: ShortenRequest = { longUrl };

        return this.http.post<ShortenResponse>(`${this.apiUrl}/shorten`, request)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Get the original long URL by short code (for analytics/dashboard)
     * Note: This will trigger the redirect logic in backend, but we intercept the response
     * 
     * @param shortCode - The short code to look up
     * @returns Observable of the redirect response
     */
    getLongUrl(shortCode: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/shorten/${shortCode}`, {
            observe: 'response',
            responseType: 'text'
        }).pipe(
            catchError(this.handleError)
        );
    }


    getAllLinks(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAllLinks`)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Check if backend is healthy
     * 
     * @returns Observable of health check response
     */
    healthCheck(): Observable<string> {
        return this.http.get(`${this.apiUrl}/health`, { responseType: 'text' })
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Handle HTTP errors and return user-friendly error messages
     * 
     * @param error - The HTTP error response
     * @returns Observable that throws an error with a user-friendly message
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'An unexpected error occurred';

        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            errorMessage = `Network error: ${error.error.message}`;
        } else {
            // Backend returned an unsuccessful response code
            switch (error.status) {
                case 0:
                    errorMessage = 'Unable to connect to server. Please ensure the backend is running on port 8082.';
                    break;
                case 400:
                    errorMessage = error.error?.message || 'Invalid URL format. Please enter a valid URL.';
                    break;
                case 404:
                    errorMessage = 'Short URL not found or has expired.';
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later.';
                    break;
                default:
                    errorMessage = `Server returned code ${error.status}: ${error.error?.message || error.message}`;
            }
        }

        return throwError(() => new Error(errorMessage));
    }
}
