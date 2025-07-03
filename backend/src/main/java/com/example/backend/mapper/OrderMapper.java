package com.example.backend.mapper;

import com.example.backend.dto.OrderDto;
import com.example.backend.entity.Order;

public class OrderMapper {

    public static OrderDto toDto(Order order){
        return OrderDto.builder()
                .id(order.getId())
                .client(order.getClient())
                .orderStatus(order.getOrderStatus())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .price(order.getPrice())
                .paymentStatus(order.getPaymentStatus())
                .address(order.getAddress())
                .deliveryDate(order.getDeliveryDate())
                .documentNumber(order.getDocumentNumber())
                .salePlace(order.getSalePlace())
                .stockMovements(order.getStockMovements())
                .build();
    }

    public static Order toEntity(OrderDto orderDto){
        return Order.builder()
                .id(orderDto.getId())
                .client(orderDto.getClient())
                .orderStatus(orderDto.getOrderStatus())
                .createdAt(orderDto.getCreatedAt())
                .updatedAt(orderDto.getUpdatedAt())
                .price(orderDto.getPrice())
                .paymentStatus(orderDto.getPaymentStatus())
                .address(orderDto.getAddress())
                .deliveryDate(orderDto.getDeliveryDate())
                .documentNumber(orderDto.getDocumentNumber())
                .salePlace(orderDto.getSalePlace())
                .stockMovements(orderDto.getStockMovements())
                .build();
    }
}
