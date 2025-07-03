package com.example.backend.dto;

import com.example.backend.entity.Product;
import com.example.backend.entity.StockMovement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class StockMovementItemDto {
    private Long id;
    private StockMovement stockMovement;
    private Product product;
    private Long quantity;
}
