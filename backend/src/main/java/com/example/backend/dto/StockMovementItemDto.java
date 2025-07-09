package com.example.backend.dto;

import com.example.backend.entity.Data;
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
    private StockMovementDto stockMovementDto;
    private ProductDto productDto;
    private Long quantity;
    private Data data;
}
