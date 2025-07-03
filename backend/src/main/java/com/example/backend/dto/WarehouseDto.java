package com.example.backend.dto;

import com.example.backend.entity.Address;
import com.example.backend.entity.StockMovement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
@AllArgsConstructor
@Getter
@Builder
public class WarehouseDto {
    private Long id;
    private Address address;
    private String type;
    private Long capacity;
    private List<StockMovement> sourceMovements;
    private List<StockMovement> targetMovements;

}
