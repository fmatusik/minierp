package com.example.backend.mapper;

import com.example.backend.dto.OrderDto;
import com.example.backend.entity.Order;
import com.example.backend.entity.OrderItem;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    public static OrderDto toDto(Order order) {
        return OrderDto.builder()
                .id(order.getId())
                .clientDto(order.getClient() != null ? ClientMapper.toDto(order.getClient()) : null)
                .status(order.getStatus())
                .data(order.getData())
                .price(order.getPrice())
                .paymentStatus(order.getPaymentStatus())
                .addressDto(order.getAddress() != null ? AddressMapper.toDto(order.getAddress()) : null)
                .deliveryDate(order.getDeliveryDate())
                .documentNumber(order.getDocumentNumber())
                .salePlace(order.getSalePlace())
                .stockMovementsDto(order.getStockMovements() != null
                        ? StockMovementMapper.toDtoList(order.getStockMovements()) : null)
                .orderItemDto(order.getOrderItem() != null ? OrderItemMapper.toDto(order.getOrderItem()) : null)
                .build();
    }

    public static Order toEntity(OrderDto orderDto, OrderItem orderItem) {
        return Order.builder()
                .id(orderDto.getId())
                .client(orderDto.getClientDto() != null ? ClientMapper.toEntity(orderDto.getClientDto()) : null)
                .status(orderDto.getStatus())
                .data(orderDto.getData())
                .price(orderDto.getPrice())
                .paymentStatus(orderDto.getPaymentStatus())
                .deliveryDate(orderDto.getDeliveryDate())
                .documentNumber(orderDto.getDocumentNumber())
                .salePlace(orderDto.getSalePlace())
                .stockMovements(orderDto.getStockMovementsDto() != null
                        ? StockMovementMapper.toEntityList(orderDto.getStockMovementsDto()) : null)
                .orderItem(orderItem)
                .build();
    }

    public static List<OrderDto> toDtoList(List<Order> entityList) {
        return entityList.stream()
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }

    public static Order toEntityWithoutOrderItem(OrderDto orderDto){
        return Order.builder()
                .id(orderDto.getId())
                .client(orderDto.getClientDto() != null ? ClientMapper.toEntity(orderDto.getClientDto()) : null)
                .status(orderDto.getStatus())
                .data(orderDto.getData())
                .price(orderDto.getPrice())
                .paymentStatus(orderDto.getPaymentStatus())
                .deliveryDate(orderDto.getDeliveryDate())
                .documentNumber(orderDto.getDocumentNumber())
                .salePlace(orderDto.getSalePlace())
                .stockMovements(orderDto.getStockMovementsDto() != null
                        ? StockMovementMapper.toEntityList(orderDto.getStockMovementsDto()) : null)
                .build();
    }

    public static List<Order> toEntityList(List<OrderDto> dtoList) {
        return dtoList.stream()
                .map(OrderMapper::toEntityWithoutOrderItem)
                .collect(Collectors.toList());
    }
}
