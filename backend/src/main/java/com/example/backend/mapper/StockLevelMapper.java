package com.example.backend.mapper;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.entity.StockLevel;

import java.util.List;
import java.util.stream.Collectors;

public class StockLevelMapper {

    public static StockLevel toEntity(StockLevelDto stockLevelDto) {
        return StockLevel.builder()
                .id(stockLevelDto.getId())
                .product(stockLevelDto.getProduct() != null ? ProductMapper.toEntity(stockLevelDto.getProduct()) : null)
                .warehouse(stockLevelDto.getWarehouse() != null ? WarehouseMapper.toEntity(stockLevelDto.getWarehouse()) : null)
                .quantity(stockLevelDto.getQuantity())
                .data(stockLevelDto.getData())
                .build();
    }

    public static StockLevelDto toDto(StockLevel stockLevel) {
        return StockLevelDto.builder()
                .id(stockLevel.getId())
                .product(stockLevel.getProduct() != null ? ProductMapper.toDto(stockLevel.getProduct()) : null)
                .warehouse(stockLevel.getWarehouse() != null ? WarehouseMapper.toDto(stockLevel.getWarehouse()) : null)
                .quantity(stockLevel.getQuantity())
                .data(stockLevel.getData())
                .build();
    }

    public static List<StockLevelDto> toDtoList(List<StockLevel> entityList) {
        return entityList.stream()
                .map(StockLevelMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<StockLevel> toEntityList(List<StockLevelDto> dtoList) {
        return dtoList.stream()
                .map(StockLevelMapper::toEntity)
                .collect(Collectors.toList());
    }
}
