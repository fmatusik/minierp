package com.example.backend.repository;

import com.example.backend.entity.StockMovementItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface StockMovementItemRepository extends JpaRepository<StockMovementItem, Long> {
    StockMovementItem findById(long id);
}
