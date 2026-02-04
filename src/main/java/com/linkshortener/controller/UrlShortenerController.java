package com.linkshortener.controller;

import com.linkshortener.Service.UrlShortenerService;
import com.linkshortener.dto.ShortenRequest;

import com.linkshortener.dto.ShortenResponse;
import com.linkshortener.entity.UrlMapping;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/url")
public class UrlShortenerController {

    @Autowired
    private UrlShortenerService urlShortenerService;

    // @Autowired
    // private UrlMapping urlMapping;;

    @GetMapping("/health")
    public String healthCheck() {
        return "OK";
    }

    @PostMapping("/shorten")
    public ShortenResponse LinkShortener(@RequestBody ShortenRequest request) {
        return urlShortenerService.ShortCodeGenerate(request.getLongUrl());

    }

    @GetMapping("/shorten/{shortcode}")
    public ResponseEntity LinkShortener(@PathVariable String shortcode, HttpServletRequest request) {

        String ipAddress = request.getRemoteAddr();
        String userAgent = request.getHeader("User-Agent");

        return urlShortenerService.getLongUrl(shortcode, ipAddress, userAgent);
    }

    @GetMapping("/api/{shortCode}/stats")
    public void getAnalytics(@PathVariable String shortCode) {
        // Later need to update, this function is for getting the stats for a particular
        // short code.
    }

    @GetMapping("/getAllLinks")
    public List<UrlMapping> getAllLinks() {

        return urlShortenerService.getAllLinks();

    }

}