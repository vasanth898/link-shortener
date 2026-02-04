package com.linkshortener.Service;

import com.linkshortener.entity.ClickLog;
import com.linkshortener.entity.UrlMapping;
import com.linkshortener.entity.UrlMapping.LinkStatus;
import com.linkshortener.Repository.ClickLogRepository;
import com.linkshortener.Repository.UrlMappingRepository;
import com.linkshortener.dto.ShortenResponse;
import com.linkshortener.exception.InvalidUrlException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.net.URL;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

@org.springframework.stereotype.Service
public class UrlShortenerService {

    @Autowired
    private UrlMappingRepository urlMappingRepository;

    @Autowired
    private ClickLogRepository clickLogRepository;

    private UrlMapping urlMapping;

    private ClickLog clickLog;

    public ShortenResponse ShortCodeGenerate(String longUrl) {

        try {
            URI uri = URI.create(longUrl);
            URL url = uri.toURL();
        } catch (Exception e) {
            throw new InvalidUrlException("Invalid URL" + longUrl);
        }

        StringBuilder shortCode = new StringBuilder();

        String characters = "2qXmR7wJ1pB5nD8c0Gf3h6tYs4oAxeUiRyKjgNlQbVWSzIHuMTOFdEpZ9vLka";

        SecureRandom random = new SecureRandom();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(characters.length());
            shortCode.append(characters.charAt(index));
        }

        if (urlMappingRepository.findByShortCode(shortCode.toString()) != null) {
            return ShortCodeGenerate(longUrl);
        }

        urlMapping = new UrlMapping();
        urlMapping.setLongUrl(longUrl);
        urlMapping.setShortCode(shortCode.toString());
        urlMapping.setCreatedDate(LocalDateTime.now());
        urlMapping.setExpiresAt(LocalDateTime.now().plusMinutes(03));
        urlMapping.setLinkStatus(LinkStatus.ACTIVE);
        urlMapping.setClickCount(0);
        urlMapping.setShortUrl("http://localhost:8082/api/url/shorten/" + shortCode);
        urlMappingRepository.save(urlMapping);

        // clickLog = new ClickLog();
        // clickLog.setUrlMapping(urlMapping);
        // clickLog.setClickedAt(LocalDateTime.now());
        // clickLogRepository.save(clickLog);

        return new ShortenResponse(shortCode.toString(), urlMapping.getShortUrl(), urlMapping.getExpiresAt(),
                urlMapping.getClickCount(), urlMapping.getCreatedDate());
    }

    public ResponseEntity getLongUrl(String shortcode, String ipAddress, String userAgent) {

        // check if the short code is valid
        UrlMapping urlMapping = urlMappingRepository.findByShortCode(shortcode);
        if (urlMapping == null) {
            throw new InvalidUrlException("URL not found");
        }

        // check if the link is expired
        if (urlMapping.getExpiresAt().isBefore(LocalDateTime.now())) {
            urlMapping.setLinkStatus(LinkStatus.EXPIRED);
            urlMappingRepository.save(urlMapping);
            throw new InvalidUrlException("Link has been expired");
        }

        // update the click count, changing the status to active and redirect to the
        // long url
        urlMapping.setLinkStatus(LinkStatus.ACTIVE);
        urlMapping.setClickCount(urlMapping.getClickCount() + 1);
        urlMappingRepository.save(urlMapping);

        // TO save the analytics

        urlMapping = urlMappingRepository.findByShortCode(shortcode);
        if (urlMapping == null) {
            throw new InvalidUrlException("URL not found");
        }

        ClickLog clickLog = new ClickLog();
        clickLog.setUrlMapping(urlMapping);
        clickLog.setIpAddress(ipAddress);
        clickLog.setUserAgent(userAgent);
        clickLog.setClickedAt(LocalDateTime.now());
        clickLogRepository.save(clickLog);

        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.TEMPORARY_REDIRECT)
                .location(URI.create(urlMapping.getLongUrl()))
                .body(urlMapping.getLongUrl());

        return responseEntity;

    }

    public List<UrlMapping> getAllLinks() {

        List<UrlMapping> urlMappings = urlMappingRepository.findAll();
        return urlMappings;
    }

}
