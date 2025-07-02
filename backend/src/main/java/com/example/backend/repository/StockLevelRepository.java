package com.example.backend.repository;

import com.example.backend.entity.StockLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface StockLevelRepository extends JpaRepository<StockLevel, Long> {
}
