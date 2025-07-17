package com.example.backend.mapper;

import com.example.backend.dto.StockMovementItemDto;
import com.example.backend.entity.Product;
import com.example.backend.entity.StockMovement;
import com.example.backend.entity.StockMovementItem;

import java.util.List;
import java.util.stream.Collectors;

public class StockMovementItemMapper {
    public static StockMovementItemDto toDto(StockMovementItem stockMovementItem) {
        return StockMovementItemDto.builder()
                .id(stockMovementItem.getId())
                .stockMovementId(stockMovementItem.getStockMovement() != null
                        ? stockMovementItem.getStockMovement().getId()
                        : null)
                .productId(stockMovementItem.getProduct().getId())
                .quantity(stockMovementItem.getQuantity())
                .data(stockMovementItem.getData())
                .build();
    }

    public static StockMovementItem toEntity(StockMovementItemDto stockMovementItemDto, StockMovement stockMovement, Product product) {
        return StockMovementItem.builder()
                .id(stockMovementItemDto.getId())
                .stockMovement(stockMovement)
                .product(product)
                .quantity(stockMovementItemDto.getQuantity())
                .data(stockMovementItemDto.getData())
                .build();
    }

    public static List<StockMovementItemDto> toDtoList(List<StockMovementItem> entityList) {
        return entityList.stream()
                .map(StockMovementItemMapper::toDto)
                .collect(Collectors.toList());
    }

}
