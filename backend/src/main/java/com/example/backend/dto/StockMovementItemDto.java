package com.example.backend.dto;

import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class StockMovementItemDto {
    private Long id;
    private StockMovementDto stockMovementDto;
    private ProductAddDto productAddDto;
    private Long quantity;
    private Data data;
}
