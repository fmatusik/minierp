package com.example.backend.mapper;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.entity.StockLevel;

public class StockLevelMapper {

    public static StockLevel toEntity(StockLevelDto stockLevelDto) {
        return StockLevel.builder()
                .id(stockLevelDto.getId())
                .product(stockLevelDto.getProduct())
                .warehouse(stockLevelDto.getWarehouse())
                .quantity(stockLevelDto.getQuantity())
                .build();
    }

    public static StockLevelDto toDto(StockLevel stockLevel) {
        return StockLevelDto.builder()
                .id(stockLevel.getId())
                .product(stockLevel.getProduct())
                .warehouse(stockLevel.getWarehouse())
                .quantity(stockLevel.getQuantity())
                .build();
    }

}
