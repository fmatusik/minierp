package com.example.backend.mapper;

import com.example.backend.dto.WarehouseDto;
import com.example.backend.entity.Warehouse;

import java.util.List;
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
                        ? StockMovementMapper.toDtoList(warehouse.getSourceMovements())
                        : null)
                .targetMovements(warehouse.getTargetMovements() != null
                        ? StockMovementMapper.toDtoList(warehouse.getTargetMovements())
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
                        ? StockMovementMapper.toEntityList(warehouseDto.getSourceMovements())
                        : null)
                .targetMovements(warehouseDto.getTargetMovements() != null
                        ? StockMovementMapper.toEntityList(warehouseDto.getTargetMovements())
                        : null)
                .data(warehouseDto.getData())
                .build();
    }

    public static List<WarehouseDto> toDtoList(List<Warehouse> entityList) {
        return entityList.stream()
                .map(WarehouseMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<Warehouse> toEntityList(List<WarehouseDto> dtoList) {
        return dtoList.stream()
                .map(WarehouseMapper::toEntity)
                .collect(Collectors.toList());
    }
}
