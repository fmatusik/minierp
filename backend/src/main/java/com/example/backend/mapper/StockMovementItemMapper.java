package com.example.backend.mapper;

import com.example.backend.dto.StockMovementItemDto;
import com.example.backend.entity.StockMovementItem;

public class StockMovementItemMapper {

    public static StockMovementItemDto toDto(StockMovementItem stockMovementItem) {
        return StockMovementItemDto.builder()
                .id(stockMovementItem.getId())
                .stockMovement(stockMovementItem.getStockMovement())
                .product(stockMovementItem.getProduct())
                .quantity(stockMovementItem.getQuantity())
                .build();
    }

    public static StockMovementItem toEntity(StockMovementItemDto stockMovementItemDto) {
        return StockMovementItem.builder()
                .id(stockMovementItemDto.getId())
                .stockMovement(stockMovementItemDto.getStockMovement())
                .product(stockMovementItemDto.getProduct())
                .quantity(stockMovementItemDto.getQuantity())
                .build();
    }
}
