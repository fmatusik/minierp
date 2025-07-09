package com.example.backend.dto;

import com.example.backend.entity.Data;
import com.example.backend.entity.Product;
import com.example.backend.entity.Warehouse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class StockLevelDto {

    private Long id;
    private ProductDto productDto;
    private WarehouseDto warehouseDto;
    private Long quantity;
    private Data data;


}
