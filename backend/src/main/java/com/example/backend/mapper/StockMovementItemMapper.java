package com.example.backend.mapper;

import com.example.backend.dto.StockMovementItemDto;
import com.example.backend.entity.StockMovementItem;

public class StockMovementItemMapper {

    public static StockMovementItemDto toStockMovementItemDto(StockMovementItem stockMovementItem) {
        return StockMovementItemDto.builder()
                .id(stockMovementItem.getId())
                .stockMovement(stockMovementItem.getStockMovement())
                .product(stockMovementItem.getProduct())
                .quantity(stockMovementItem.getQuantity())
                .build();
    }
}
