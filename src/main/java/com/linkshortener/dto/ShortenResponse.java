package com.linkshortener.dto;

import java.time.LocalDateTime;

public class ShortenResponse {

    private String shortCode;
    private String shortUrl;
    private LocalDateTime expiresAt;
    private int clickCount;
    private LocalDateTime createdDate;

    public ShortenResponse() {
    }

    public ShortenResponse(String shortCode, String shortUrl, LocalDateTime expiresAt, int clickCount,
            LocalDateTime createdDate) {
        this.shortCode = shortCode;
        this.shortUrl = shortUrl;
        this.expiresAt = expiresAt;
        this.clickCount = clickCount;
        this.createdDate = createdDate;
    }

    public String getShortCode() {
        return shortCode;
    }

    public void setShortCode(String shortCode) {
        this.shortCode = shortCode;
    }

    public String getShortUrl() {
        return shortUrl;
    }

    public void setShortUrl(String shortUrl) {
        this.shortUrl = shortUrl;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public int getClickCount() {
        return clickCount;
    }

    public void setClickCount(int clickCount) {
        this.clickCount = clickCount;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

}
