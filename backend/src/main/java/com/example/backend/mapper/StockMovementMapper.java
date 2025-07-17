package com.example.backend.mapper;

import com.example.backend.dto.StockMovementDto;
import com.example.backend.entity.Address;
import com.example.backend.entity.Order;
import com.example.backend.entity.StockMovement;
import com.example.backend.entity.Warehouse;

import java.util.List;
import java.util.stream.Collectors;

public class StockMovementMapper {

    public static StockMovementDto toDto(StockMovement stockMovement) {
        return StockMovementDto.builder()
                .id(stockMovement.getId())
                .stockMovementNumber(stockMovement.getStockMovementNumber())
                .sourceWarehouseId(stockMovement.getSourceWarehouse() != null
                        ? stockMovement.getSourceWarehouse().getId() : null)
                .targetWarehouseId(stockMovement.getTargetWarehouse() != null
                        ? stockMovement.getTargetWarehouse().getId() : null)
                .relatedOrderId(stockMovement.getRelatedOrder() != null
                        ? stockMovement.getRelatedOrder().getId() : null)
                .note(stockMovement.getNote())
                .type(stockMovement.getType())
                .data(stockMovement.getData())
                .build();
    }

    public static StockMovement toEntity(StockMovementDto stockMovementDto, Order relatedOrder, Warehouse sourceWarehouse, Warehouse targetWarehouse) {
        return StockMovement.builder()
                .id(stockMovementDto.getId())
                .stockMovementNumber(stockMovementDto.getStockMovementNumber())
                .sourceWarehouse(sourceWarehouse)
                .targetWarehouse(targetWarehouse)
                .relatedOrder(relatedOrder)
                .note(stockMovementDto.getNote())
                .type(stockMovementDto.getType())
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
                .map(StockMovementMapper::toEntityWithoutOrderAndSourceWarehouseAndTargetWarehouse)
                .collect(Collectors.toList());
    }

    public static StockMovement toEntityWithoutOrderAndSourceWarehouseAndTargetWarehouse(StockMovementDto stockMovementDto) {
        return StockMovement.builder()
                .id(stockMovementDto.getId())
                .stockMovementNumber(stockMovementDto.getStockMovementNumber())
                .note(stockMovementDto.getNote())
                .type(stockMovementDto.getType())
                .data(stockMovementDto.getData())
                .build();
    }
}
