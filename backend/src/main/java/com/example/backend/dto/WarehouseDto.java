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
    private AddressDto address;
    private WarehouseType type;
    private Long capacity;
    private List<StockMovementDto> sourceMovements;
    private List<StockMovementDto> targetMovements;
    private Data data;

}
