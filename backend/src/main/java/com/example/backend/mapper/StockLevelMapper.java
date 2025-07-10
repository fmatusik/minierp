package com.example.backend.mapper;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.entity.Product;
import com.example.backend.entity.StockLevel;

import java.util.List;
import java.util.stream.Collectors;

public class StockLevelMapper {

    public static StockLevel toEntity(StockLevelDto stockLevelDto, Product product) {
        return StockLevel.builder()
                .id(stockLevelDto.getId())
                .product(product)
                .warehouse(stockLevelDto.getWarehouseDto() != null ? WarehouseMapper.toEntity(stockLevelDto.getWarehouseDto()) : null)
                .quantity(stockLevelDto.getQuantity())
                .data(stockLevelDto.getData())
                .build();
    }

    public static StockLevelDto toDto(StockLevel stockLevel) {
        return StockLevelDto.builder()
                .id(stockLevel.getId())
                .productDto(stockLevel.getProduct() != null ? ProductMapper.toDto(stockLevel.getProduct()) : null)
                .warehouseDto(stockLevel.getWarehouse() != null ? WarehouseMapper.toDto(stockLevel.getWarehouse()) : null)
                .quantity(stockLevel.getQuantity())
                .data(stockLevel.getData())
                .build();
    }

    public static List<StockLevelDto> toDtoList(List<StockLevel> entityList) {
        return entityList.stream()
                .map(StockLevelMapper::toDto)
                .collect(Collectors.toList());
    }

    public static StockLevel toEntityWithoutProduct(StockLevelDto stockLevelDto) {
        return StockLevel.builder()
                .id(stockLevelDto.getId())
                .warehouse(stockLevelDto.getWarehouseDto() != null ? WarehouseMapper.toEntity(stockLevelDto.getWarehouseDto()) : null)
                .quantity(stockLevelDto.getQuantity())
                .data(stockLevelDto.getData())
                .build();
    }


    public static List<StockLevel> toEntityList(List<StockLevelDto> dtoList) {
        return dtoList.stream()
                .map(StockLevelMapper::toEntityWithoutProduct)
                .collect(Collectors.toList());
    }
}
