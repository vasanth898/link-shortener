package com.linkshortener.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "click_log")
public class ClickLog {

    // This class is to store the analytics for each click

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String ipAddress;
    private String userAgent;
    private LocalDateTime clickedAt;

    @ManyToOne
    @JoinColumn(name = "url_mapping_id")
    private UrlMapping urlMapping;

    public ClickLog() {
    }

    public ClickLog(UUID id, String ipAddress, String userAgent, LocalDateTime clickedAt, UrlMapping urlMapping) {
        this.id = id;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.clickedAt = clickedAt;
        this.urlMapping = urlMapping;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public LocalDateTime getClickedAt() {
        return clickedAt;
    }

    public void setClickedAt(LocalDateTime clickedAt) {
        this.clickedAt = clickedAt;
    }

    public UrlMapping getUrlMapping() {
        return urlMapping;
    }

    public void setUrlMapping(UrlMapping urlMapping) {
        this.urlMapping = urlMapping;
    }

}
