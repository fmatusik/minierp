package com.example.backend.dto;

import com.example.backend.entity.Data;
import com.example.backend.enums.StockMovementType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class StockMovementDto {
    private Long id;
    private String stockMovementNumber;
    private Long sourceWarehouseId;
    private Long targetWarehouseId;
    private Long relatedOrderId;
    private String note;
    private StockMovementType type;
    private Data data;
}
