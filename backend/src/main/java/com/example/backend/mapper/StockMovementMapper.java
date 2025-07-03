package com.example.backend.mapper;

import com.example.backend.dto.StockMovementDto;
import com.example.backend.entity.StockMovement;

public class StockMovementMapper {

    public static StockMovementDto toDto(StockMovement stockMovement) {
        return StockMovementDto.builder()
                .id(stockMovement.getId())
                .sourceWarehouse(stockMovement.getSourceWarehouse())
                .targetWarehouse(stockMovement.getTargetWarehouse())
                .relatedOrder(stockMovement.getRelatedOrder())
                .note(stockMovement.getNote())
                .createdAt(stockMovement.getCreatedAt())
                .updatedAt(stockMovement.getUpdatedAt())
                .build();
    }

    public static StockMovement toEntity(StockMovementDto stockMovementDto) {
        return StockMovement.builder()
                .id(stockMovementDto.getId())
                .sourceWarehouse(stockMovementDto.getSourceWarehouse())
                .targetWarehouse(stockMovementDto.getTargetWarehouse())
                .relatedOrder(stockMovementDto.getRelatedOrder())
                .note(stockMovementDto.getNote())
                .createdAt(stockMovementDto.getCreatedAt())
                .updatedAt(stockMovementDto.getUpdatedAt())
                .build();
    }
}
