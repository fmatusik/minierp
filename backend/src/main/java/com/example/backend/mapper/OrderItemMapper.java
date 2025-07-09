package com.example.backend.mapper;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.entity.OrderItem;

import java.util.List;
import java.util.stream.Collectors;

public class OrderItemMapper {

    public static OrderItemDto toDto(OrderItem orderItem) {
        return OrderItemDto.builder()
                .id(orderItem.getId())
                .productDto(orderItem.getProduct() != null ? ProductMapper.toDto(orderItem.getProduct()) : null)
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .data(orderItem.getData())
                .build();
    }

    public static OrderItem toEntity(OrderItemDto orderItemDto) {
        return OrderItem.builder()
                .id(orderItemDto.getId())
                .product(orderItemDto.getProductDto() != null ? ProductMapper.toEntity(orderItemDto.getProductDto()) : null)
                .quantity(orderItemDto.getQuantity())
                .price(orderItemDto.getPrice())
                .data(orderItemDto.getData())
                .build();
    }

    public static List<OrderItemDto> toDtoList(List<OrderItem> entityList) {
        return entityList.stream()
                .map(OrderItemMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<OrderItem> toEntityList(List<OrderItemDto> dtoList) {
        return dtoList.stream()
                .map(OrderItemMapper::toEntity)
                .collect(Collectors.toList());
    }
}
