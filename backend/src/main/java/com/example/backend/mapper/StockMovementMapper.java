package com.example.backend.mapper;

import com.example.backend.dto.StockMovementDto;
import com.example.backend.entity.StockMovement;

import java.util.List;
import java.util.stream.Collectors;

public class StockMovementMapper {

    public static StockMovementDto toDto(StockMovement stockMovement) {
        return StockMovementDto.builder()
                .id(stockMovement.getId())
                .sourceWarehouse(stockMovement.getSourceWarehouse() != null
                        ? WarehouseMapper.toDto(stockMovement.getSourceWarehouse()) : null)
                .targetWarehouse(stockMovement.getTargetWarehouse() != null
                        ? WarehouseMapper.toDto(stockMovement.getTargetWarehouse()) : null)
                .relatedOrder(stockMovement.getRelatedOrder() != null
                        ? OrderMapper.toDto(stockMovement.getRelatedOrder()) : null)
                .note(stockMovement.getNote())
                .data(stockMovement.getData())
                .build();
    }

    public static StockMovement toEntity(StockMovementDto stockMovementDto) {
        return StockMovement.builder()
                .id(stockMovementDto.getId())
                .sourceWarehouse(stockMovementDto.getSourceWarehouse() != null
                        ? WarehouseMapper.toEntity(stockMovementDto.getSourceWarehouse()) : null)
                .targetWarehouse(stockMovementDto.getTargetWarehouse() != null
                        ? WarehouseMapper.toEntity(stockMovementDto.getTargetWarehouse()) : null)
                .relatedOrder(stockMovementDto.getRelatedOrder() != null
                        ? OrderMapper.toEntity(stockMovementDto.getRelatedOrder()) : null)
                .note(stockMovementDto.getNote())
                .data(stockMovementDto.getData())
                .build();
    }

    public static List<StockMovementDto> toDtoList(List<StockMovement> entityList) {
        return entityList.stream()
                .map(StockMovementMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<StockMovement> toEntityList(List<StockMovementDto> dtoList) {
        return dtoList.stream()
                .map(StockMovementMapper::toEntity)
                .collect(Collectors.toList());
    }
}
