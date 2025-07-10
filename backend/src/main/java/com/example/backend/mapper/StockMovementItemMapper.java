package com.example.backend.mapper;

import com.example.backend.dto.StockMovementItemDto;
import com.example.backend.entity.StockMovementItem;

import java.util.List;
import java.util.stream.Collectors;

public class StockMovementItemMapper {
/*
    public static StockMovementItemDto toDto(StockMovementItem stockMovementItem) {
        return StockMovementItemDto.builder()
                .id(stockMovementItem.getId())
                .stockMovementDto(stockMovementItem.getStockMovement() != null
                        ? StockMovementMapper.toDto(stockMovementItem.getStockMovement())
                        : null)
                .productDto(stockMovementItem.getProduct() != null
                        ? ProductMapper.toDto(stockMovementItem.getProduct())
                        : null)
                .quantity(stockMovementItem.getQuantity())
                .data(stockMovementItem.getData())
                .build();
    }

    public static StockMovementItem toEntity(StockMovementItemDto stockMovementItemDto) {
        return StockMovementItem.builder()
                .id(stockMovementItemDto.getId())
                .stockMovement(stockMovementItemDto.getStockMovementDto() != null
                        ? StockMovementMapper.toEntity(stockMovementItemDto.getStockMovementDto())
                        : null)
                .product(stockMovementItemDto.getProductDto() != null
                        ? ProductMapper.toEntity(stockMovementItemDto.getProductDto())
                        : null)
                .quantity(stockMovementItemDto.getQuantity())
                .data(stockMovementItemDto.getData())
                .build();
    }

    public static List<StockMovementItemDto> toDtoList(List<StockMovementItem> entityList) {
        return entityList.stream()
                .map(StockMovementItemMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<StockMovementItem> toEntityList(List<StockMovementItemDto> dtoList) {
        return dtoList.stream()
                .map(StockMovementItemMapper::toEntity)
                .collect(Collectors.toList());
    }*/
}
