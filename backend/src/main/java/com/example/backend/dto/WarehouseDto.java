package com.example.backend.dto;

import com.example.backend.entity.Address;
import com.example.backend.entity.Data;
import com.example.backend.entity.StockMovement;
import com.example.backend.enums.WarehouseType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
@AllArgsConstructor
@Getter
@Builder
public class WarehouseDto {
    private Long id;
    private AddressDto addressDto;
    private WarehouseType type;
    private Long capacity;
    private List<StockMovementDto> sourceMovementsDto;
    private List<StockMovementDto> targetMovementsDto;
    private Data data;
    private List<StockLevelDto> stockLevelsDto;

}
