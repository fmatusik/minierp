package com.example.backend.mapper;

import com.example.backend.dto.OrderDto;
import com.example.backend.entity.Order;
import com.example.backend.entity.OrderItem;
import lombok.AllArgsConstructor; // Add this import
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor // Add this to allow constructor injection
public class OrderMapper {

    // Inject OrderItemMapper
    private final OrderItemMapper orderItemMapper;

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
                .orderItems(order.getOrderItems() != null ? OrderItemMapper.toDtoList(order.getOrderItems()) : null)
                .build();
    }

    public Order toEntity(OrderDto orderDto) { // Make this method non-static
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
                .address(orderDto.getAddressDto() != null ? AddressMapper.toEntity(orderDto.getAddressDto(), ClientMapper.toEntity(orderDto.getClientDto())) : null)
                .stockMovements(orderDto.getStockMovementsDto() != null
                        ? StockMovementMapper.toEntityList(orderDto.getStockMovementsDto()) : null)
                .orderItems(orderDto.getOrderItems() != null ? orderItemMapper.toEntityList(orderDto.getOrderItems()) : null) // Use the injected instance
                .build();
    }

    public static List<OrderDto> toDtoList(List<Order> entityList) {
        return entityList.stream()
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<Order> toEntityList(List<OrderDto> dtoList) { // Make this method non-static
        return dtoList.stream()
                .map(this::toEntity) // Use 'this::toEntity' to call the non-static method
                .collect(Collectors.toList());
    }
}