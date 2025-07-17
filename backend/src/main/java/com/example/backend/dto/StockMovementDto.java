package com.example.backend.dto;

import com.example.backend.entity.Data;
import com.example.backend.enums.StockMovementType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class StockMovementDto {
    private Long id;
    private Long sourceWarehouseId;
    private Long targetWarehouseId;
    private Long relatedOrderId;
    private String note;
    private StockMovementType type;
    private Data data;
}
