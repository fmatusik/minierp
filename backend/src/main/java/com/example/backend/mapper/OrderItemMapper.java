package com.example.backend.mapper;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.entity.OrderItem;
import com.example.backend.repository.ProductRepository; // Make sure this import is correct
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component; // Add this annotation for Spring to manage it

import java.util.List;
import java.util.stream.Collectors;

@Component // Mark as a Spring component
@AllArgsConstructor // Lombok annotation for constructor injection
public class OrderItemMapper {

    private final ProductRepository productRepository; // Use 'final' as it's injected

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

    // This method needs to be non-static to use productRepository
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

    // Modify this method to use the non-static toEntity method
    public List<OrderItem> toEntityList(List<OrderItemDto> dtoList) {
        return dtoList.stream()
                .map(this::toEntity) // Use 'this::toEntity' to call the non-static method
                .collect(Collectors.toList());
    }
}