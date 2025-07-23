package com.example.backend.mapper;

import com.example.backend.dto.WarehouseAddDto;
import com.example.backend.dto.WarehouseFindDto;
import com.example.backend.entity.Address;
import com.example.backend.entity.Warehouse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class WarehouseMapper {

    public static WarehouseAddDto toDto(Warehouse warehouse) {
        return WarehouseAddDto.builder()
                .id(warehouse.getId())
                .name(warehouse.getName())
                .addressId(warehouse.getAddress() != null
                        ? AddressMapper.toDtoWithoutClient(warehouse.getAddress()).getId()
                        : null)
                .type(warehouse.getType())
                .capacity(warehouse.getCapacity())
                .sourceMovementsDto(warehouse.getSourceMovements() != null
                        ? StockMovementMapper.toDtoList(warehouse.getSourceMovements())
                        : null)
                .targetMovementsDto(warehouse.getTargetMovements() != null
                        ? StockMovementMapper.toDtoList(warehouse.getTargetMovements())
                        : null)
                .data(warehouse.getData())
                .stockLevelsDto(warehouse.getStockLevels() != null ? StockLevelMapper.toDtoList(warehouse.getStockLevels()) : null)
                .build();
    }

    public static Warehouse toEntity(WarehouseAddDto warehouseAddDto, Address address) {
        return Warehouse.builder()
                .id(warehouseAddDto.getId())
                .name(warehouseAddDto.getName())
                .type(warehouseAddDto.getType())
                .capacity(warehouseAddDto.getCapacity())
                .sourceMovements(warehouseAddDto.getSourceMovementsDto() != null
                        ? StockMovementMapper.toEntityList(warehouseAddDto.getSourceMovementsDto())
                        : null)
                .targetMovements(warehouseAddDto.getTargetMovementsDto() != null
                        ? StockMovementMapper.toEntityList(warehouseAddDto.getTargetMovementsDto())
                        : null)
                .address(address)
                .data(warehouseAddDto.getData())
                .stockLevels(warehouseAddDto.getStockLevelsDto() != null ? StockLevelMapper.toEntityList(warehouseAddDto.getStockLevelsDto()) : null)
                .build();
    }

    public static List<WarehouseAddDto> toDtoList(List<Warehouse> entityList) {
        return entityList.stream()
                .map(WarehouseMapper::toDto)
                .collect(Collectors.toList());
    }


    public static WarehouseFindDto toFindDto(Warehouse warehouse) {
        return WarehouseFindDto.builder()
                .id(warehouse.getId() != null ? warehouse.getId() : null)
                .name(warehouse.getName())
                .addressDto(warehouse.getAddress() != null ? AddressMapper.toDto(warehouse.getAddress()) : null)
                .type(warehouse.getType())
                .capacity(warehouse.getCapacity())
                .sourceMovementsDto(warehouse.getSourceMovements() != null
                        ? StockMovementMapper.toDtoList(warehouse.getSourceMovements())
                        : null)
                .targetMovementsDto(warehouse.getTargetMovements() != null
                        ? StockMovementMapper.toDtoList(warehouse.getTargetMovements())
                        : null)
                .data(warehouse.getData())
                .stockLevelsDto(warehouse.getStockLevels() != null ? StockLevelMapper.toDtoList(warehouse.getStockLevels()) : null)
                .build();
    }

    public static List<WarehouseFindDto> toDtoFindList(List<Warehouse> entityList) {
        return entityList.stream()
                .map(WarehouseMapper::toFindDto)
                .collect(Collectors.toList());
    }
}
