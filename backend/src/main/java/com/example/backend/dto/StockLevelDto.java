package com.example.backend.dto;

import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class StockLevelDto {
    private Long id;
    private Long productId;
    private Long warehouseId;
    private Long quantity;
    private Long minimumQuantity;
    private Data data;
}
