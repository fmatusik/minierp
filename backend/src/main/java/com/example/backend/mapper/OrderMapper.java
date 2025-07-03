package com.example.backend.mapper;

import com.example.backend.dto.OrderDto;
import com.example.backend.entity.Order;

import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDto toDto(Order order) {
        return OrderDto.builder()
                .id(order.getId())
                .client(order.getClient() != null ? ClientMapper.toDto(order.getClient()) : null)
                .orderStatus(order.getOrderStatus())
                .data(order.getData())
                .price(order.getPrice())
                .paymentStatus(order.getPaymentStatus())
                .address(order.getAddress() != null ? AddressMapper.toDto(order.getAddress()) : null)
                .deliveryDate(order.getDeliveryDate())
                .documentNumber(order.getDocumentNumber())
                .salePlace(order.getSalePlace())
                .stockMovements(order.getStockMovements() != null
                        ? StockMovementMapper.toDtoList(order.getStockMovements()) : null)
                .build();
    }

    public static Order toEntity(OrderDto orderDto) {
        return Order.builder()
                .id(orderDto.getId())
                .client(orderDto.getClient() != null ? ClientMapper.toEntity(orderDto.getClient()) : null)
                .orderStatus(orderDto.getOrderStatus())
                .data(orderDto.getData())
                .price(orderDto.getPrice())
                .paymentStatus(orderDto.getPaymentStatus())
                .address(orderDto.getAddress() != null ? AddressMapper.toEntity(orderDto.getAddress()) : null)
                .deliveryDate(orderDto.getDeliveryDate())
                .documentNumber(orderDto.getDocumentNumber())
                .salePlace(orderDto.getSalePlace())
                .stockMovements(orderDto.getStockMovements() != null
                        ? StockMovementMapper.toEntityList(orderDto.getStockMovements()) : null)
                .build();
    }

    public static List<OrderDto> toDtoList(List<Order> entityList) {
        return entityList.stream()
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<Order> toEntityList(List<OrderDto> dtoList) {
        return dtoList.stream()
                .map(OrderMapper::toEntity)
                .collect(Collectors.toList());
    }
}
