package com.example.backend.mapper;

import com.example.backend.dto.WarehouseDto;
import com.example.backend.entity.Warehouse;

import java.util.stream.Collectors;

public class WarehouseMapper {

    public static WarehouseDto toDto(Warehouse warehouse) {
        return WarehouseDto.builder()
                .id(warehouse.getId())
                .address(warehouse.getAddress() != null
                        ? AddressMapper.toDto(warehouse.getAddress())
                        : null)
                .type(warehouse.getType())
                .capacity(warehouse.getCapacity())
                .sourceMovements(warehouse.getSourceMovements() != null
                        ? warehouse.getSourceMovements().stream()
                        .map(StockMovementMapper::toDto)
                        .collect(Collectors.toList())
                        : null)
                .targetMovements(warehouse.getTargetMovements() != null
                        ? warehouse.getTargetMovements().stream()
                        .map(StockMovementMapper::toDto)
                        .collect(Collectors.toList())
                        : null)
                .data(warehouse.getData())
                .build();
    }

    public static Warehouse toEntity(WarehouseDto warehouseDto) {
        return Warehouse.builder()
                .id(warehouseDto.getId())
                .address(warehouseDto.getAddress() != null
                        ? AddressMapper.toEntity(warehouseDto.getAddress())
                        : null)
                .type(warehouseDto.getType())
                .capacity(warehouseDto.getCapacity())
                .sourceMovements(warehouseDto.getSourceMovements() != null
                        ? warehouseDto.getSourceMovements().stream()
                        .map(StockMovementMapper::toEntity)
                        .collect(Collectors.toList())
                        : null)
                .targetMovements(warehouseDto.getTargetMovements() != null
                        ? warehouseDto.getTargetMovements().stream()
                        .map(StockMovementMapper::toEntity)
                        .collect(Collectors.toList())
                        : null)
                .data(warehouseDto.getData())
                .build();
    }
}
