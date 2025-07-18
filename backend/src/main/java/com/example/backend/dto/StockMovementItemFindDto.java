package com.example.backend.dto;

import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class StockMovementItemFindDto {
    private Long id;
    private ProductFindDto productDto;
    private Long quantity;
    private Data data;
    private double price;
}
