package com.example.backend.dto;

import com.example.backend.entity.Data;
import com.example.backend.enums.StockMovementType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class StockMovementFindDto {
    private Long id;
    private String stockMovementNumber;
    private WarehouseFindDto sourceWarehouse;
    private WarehouseFindDto targetWarehouse;
    private OrderFindDto relatedOrder;
    private String note;
    private StockMovementType type;
    private Data data;
    private List<StockMovementItemFindDto> stockMovementItemsDto;
}
