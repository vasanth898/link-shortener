/**
 * Application Configuration
 * 
 * Provides core configuration for the Angular application including:
 * - Routing configuration
 * - HTTP interceptors and services
 * - Providers for dependency injection
 */
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes), // Enable routing
        provideHttpClient()    // Enable HTTP client for API calls
    ]
};
