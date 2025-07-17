package com.example.backend.dto;

import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class StockLevelFindDto {

    private Long id;
    private ProductFindDto productDto;
    private WarehouseFindDto warehouseDto;
    private Long quantity;
    private Long minimumQuantity;
    private Data data;


}
