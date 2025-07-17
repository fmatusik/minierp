package com.example.backend.mapper;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.dto.StockLevelFindDto;
import com.example.backend.entity.Product;
import com.example.backend.entity.StockLevel;
import com.example.backend.entity.Warehouse;

import java.util.List;
import java.util.stream.Collectors;

public class StockLevelMapper {

    public static StockLevel toEntity(StockLevelDto stockLevelDto, Product product, Warehouse warehouse) {
        return StockLevel.builder()
                .id(stockLevelDto.getId())
                .product(product)
                .warehouse(warehouse)
                .quantity(stockLevelDto.getQuantity())
                .minimumQuantity(stockLevelDto.getMinimumQuantity())
                .data(stockLevelDto.getData())
                .build();
    }

    public static StockLevelDto toDto(StockLevel stockLevel) {
        return StockLevelDto.builder()
                .id(stockLevel.getId())
                .productId(stockLevel.getProduct() != null ? stockLevel.getProduct().getId() : null)
                .warehouseId(stockLevel.getWarehouse() != null ? stockLevel.getWarehouse().getId() : null)
                .quantity(stockLevel.getQuantity())
                .minimumQuantity(stockLevel.getMinimumQuantity())
                .data(stockLevel.getData())
                .build();
    }

    public static List<StockLevelDto> toDtoList(List<StockLevel> entityList) {
        return entityList.stream()
                .map(StockLevelMapper::toDto)
                .collect(Collectors.toList());
    }

    public static StockLevel toEntityWithoutProductAndWarehouse(StockLevelDto stockLevelDto) {
        return StockLevel.builder()
                .id(stockLevelDto.getId())
                .quantity(stockLevelDto.getQuantity())
                .minimumQuantity(stockLevelDto.getMinimumQuantity())
                .data(stockLevelDto.getData())
                .build();
    }


    public static List<StockLevel> toEntityList(List<StockLevelDto> dtoList) {
        return dtoList.stream()
                .map(StockLevelMapper::toEntityWithoutProductAndWarehouse)
                .collect(Collectors.toList());
    }

    public static StockLevelFindDto toFindDto(StockLevel stockLevel) {
        return StockLevelFindDto.builder()
                .id(stockLevel.getId())
                .productDto(stockLevel.getProduct() != null ? ProductMapper.toFindDto(stockLevel.getProduct()) : null)
                .warehouseDto(stockLevel.getWarehouse() != null ? WarehouseMapper.toFindDto(stockLevel.getWarehouse()) : null)
                .quantity(stockLevel.getQuantity())
                .minimumQuantity(stockLevel.getMinimumQuantity())
                .data(stockLevel.getData())
                .build();
    }

    public static List<StockLevelFindDto> toDtoFindList(List<StockLevel> entityList){
        return entityList.stream()
                .map(StockLevelMapper::toFindDto)
                .collect(Collectors.toList());
    }

}
