package com.example.backend.mapper;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.entity.OrderItem;

public class OrderItemMapper {

    public static OrderItemDto toDto(OrderItem orderItem){
        return OrderItemDto.builder()
                .id(orderItem.getId())
                .order(orderItem.getOrder())
                .product(orderItem.getProduct())
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .build();
    }

    public static OrderItem toEntity(OrderItemDto orderItemDto){
        return OrderItem.builder()
                .id(orderItemDto.getId())
                .order(orderItemDto.getOrder())
                .product(orderItemDto.getProduct())
                .quantity(orderItemDto.getQuantity())
                .price(orderItemDto.getPrice())
                .build();
    }
}
