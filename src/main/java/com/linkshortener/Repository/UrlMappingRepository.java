package com.linkshortener.Repository;

import com.linkshortener.entity.UrlMapping;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UrlMappingRepository extends JpaRepository<UrlMapping, UUID> {

    UrlMapping findByShortCode(String shortCode);

}
