package com.example.backend.dto;

import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class StockMovementDto {
    private Long id;
    private WarehouseDto sourceWarehouseDto;
    private WarehouseDto targetWarehouseDto;
    private OrderAddDto relatedOrderAddDto;
    private String note;
    private Data data;
}
