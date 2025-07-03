package com.example.backend.mapper;

import com.example.backend.dto.StockMovementItemDto;
import com.example.backend.entity.StockMovementItem;

public class StockMovementItemMapper {

    public static StockMovementItemDto toDto(StockMovementItem stockMovementItem) {
        return StockMovementItemDto.builder()
                .id(stockMovementItem.getId())
                .stockMovement(stockMovementItem.getStockMovement() != null ? StockMovementMapper.toDto(stockMovementItem.getStockMovement()) : null)
                .product(stockMovementItem.getProduct()  != null ? ProductMapper.toDto(stockMovementItem.getProduct()) : null)
                .quantity(stockMovementItem.getQuantity())
                .data(stockMovementItem.getData())
                .build();
    }

    public static StockMovementItem toEntity(StockMovementItemDto stockMovementItemDto) {
        return StockMovementItem.builder()
                .id(stockMovementItemDto.getId())
                .stockMovement(stockMovementItemDto.getStockMovement() != null ? StockMovementMapper.toEntity(stockMovementItemDto.getStockMovement()) : null)
                .product(stockMovementItemDto.getProduct() != null ? ProductMapper.toEntity(stockMovementItemDto.getProduct()) : null)
                .quantity(stockMovementItemDto.getQuantity())
                .data(stockMovementItemDto.getData())
                .build();
    }
}
