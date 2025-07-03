package com.example.backend.dto;

import com.example.backend.entity.Data;
import com.example.backend.entity.Order;
import com.example.backend.entity.Warehouse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
@Getter
public class StockMovementDto {
    private Long id;
    private WarehouseDto sourceWarehouse;
    private WarehouseDto targetWarehouse;
    private OrderDto relatedOrder;
    private String note;
    private Data data;
}
