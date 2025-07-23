package com.example.backend.dto;

import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@AllArgsConstructor
@Getter
@Builder
public class OrderItemDto {
    private Long id;
    private Long productId;
    private Long quantity;
    private double price;
    private Data data;
    private OrderFindDto order;
}
