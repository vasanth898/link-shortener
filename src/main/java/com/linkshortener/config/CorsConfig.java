package com.linkshortener.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 * 
 * This configuration allows the Angular frontend (running on
 * http://localhost:4200)
 * to make HTTP requests to the Spring Boot backend (running on
 * http://localhost:8082).
 * 
 * Without this configuration, browsers will block requests from the frontend to
 * backend
 * due to the Same-Origin Policy (different ports are considered different
 * origins).
 */
@Configuration
public class CorsConfig {

    /**
     * Configure CORS mappings for the application
     * 
     * @return WebMvcConfigurer with CORS settings
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Apply CORS to all /api/** endpoints
                        .allowedOrigins("http://localhost:4200") // Allow requests from Angular dev server
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                        .allowedHeaders("*") // Allow all headers
                        .allowCredentials(true) // Allow cookies and authorization headers
                        .maxAge(3600); // Cache preflight response for 1 hour
            }
        };
    }
}
