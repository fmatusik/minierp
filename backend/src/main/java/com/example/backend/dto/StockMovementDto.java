package com.example.backend.dto;

import com.example.backend.entity.Order;
import com.example.backend.entity.Warehouse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@AllArgsConstructor
@Builder
@Getter
public class StockMovementDto {
    private Long id;
    private Warehouse sourceWarehouse;
    private Warehouse targetWarehouse;
    private Order relatedOrder;
    private String note;
    private LocalDate createdAt;
    private LocalDate updatedAt;
}
