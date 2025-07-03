package com.example.backend.dto;

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
    private Product product;
    private Warehouse warehouse;
    private Long quantity;


}
