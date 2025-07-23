package com.example.backend.mapper;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.entity.OrderItem;
import com.example.backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class OrderItemMapper {

    private final ProductRepository productRepository;

    public static OrderItemDto toDto(OrderItem orderItem) {
        return OrderItemDto.builder()
                .id(orderItem.getId())
                .productId(orderItem.getProduct() != null ? ProductMapper.toDto(orderItem.getProduct()).getId() : null)
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .order(orderItem.getRelatedOrder() != null ? OrderMapper.toDtoFindWithoutOrderItemStatusAndAddress(orderItem.getRelatedOrder()) : null)
                .data(orderItem.getData())
                .build();
    }

    public OrderItem toEntity(OrderItemDto orderItemDto) {
        return OrderItem.builder()
                .id(orderItemDto.getId())
                .product(orderItemDto.getProductId() != null ? productRepository.findById(orderItemDto.getProductId()).orElse(null) : null)
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

    public List<OrderItem> toEntityList(List<OrderItemDto> dtoList) {
        return dtoList.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}