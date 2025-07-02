package com.example.backend.repository;

import com.example.backend.entity.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {
}
