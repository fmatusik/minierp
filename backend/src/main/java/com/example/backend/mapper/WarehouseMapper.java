package com.example.backend.mapper;

import com.example.backend.dto.WarehouseDto;
import com.example.backend.entity.Warehouse;

public class WarehouseMapper {

    public static WarehouseDto toDto(Warehouse warehouse) {
        return WarehouseDto.builder()
                .id(warehouse.getId())
                .address(warehouse.getAddress())
                .type(warehouse.getType())
                .capacity(warehouse.getCapacity())
                .sourceMovements(warehouse.getSourceMovements())
                .targetMovements(warehouse.getTargetMovements())
                .build();
    }

    public static Warehouse toEntity(WarehouseDto warehouseDto){
        return Warehouse.builder()
                .id(warehouseDto.getId())
                .address(warehouseDto.getAddress())
                .type(warehouseDto.getType())
                .capacity(warehouseDto.getCapacity())
                .sourceMovements(warehouseDto.getSourceMovements())
                .targetMovements(warehouseDto.getTargetMovements())
                .build();
    }
}
