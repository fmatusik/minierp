package com.example.backend.mapper;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.entity.OrderItem;
import com.example.backend.entity.Product;

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

    public static OrderItem toEntity(OrderItemDto orderItemDto, Product product) {
        return OrderItem.builder()
                .id(orderItemDto.getId())
                .product(product)
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



    public static OrderItem toEntityWithoutProduct(OrderItemDto orderItemDto) {
        return OrderItem.builder()
                .id(orderItemDto.getId())
                .quantity(orderItemDto.getQuantity())
                .price(orderItemDto.getPrice())
                .data(orderItemDto.getData())
                .build();
    }

    public static List<OrderItem> toEntityList(List<OrderItemDto> dtoList) {
        return dtoList.stream()
                .map(OrderItemMapper::toEntityWithoutProduct)
                .collect(Collectors.toList());
    }
}
