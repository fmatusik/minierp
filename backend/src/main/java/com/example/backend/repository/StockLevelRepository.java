package com.example.backend.repository;

import com.example.backend.entity.StockLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface StockLevelRepository extends JpaRepository<StockLevel, Long> {
    List<StockLevel> findAllByWarehouseId(long id);
    List<StockLevel> findAllByWarehouseIdAndProductId(long warehouseId, long productId);
}
