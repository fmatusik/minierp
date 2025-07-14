package com.example.backend.dto;

import com.example.backend.entity.Data;
import com.example.backend.entity.Order;
import com.example.backend.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


@AllArgsConstructor
@Getter
@Builder
public class OrderItemDto {
    private Long id;
    private Long productId;
    private Long quantity;
    private Long price;
    private Data data;
    private Long orderId;
}
