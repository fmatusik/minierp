package com.example.backend.services.impl;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.Order;
import com.example.backend.entity.OrderItem;
import com.example.backend.entity.Product;
import com.example.backend.mapper.OrderItemMapper;
import com.example.backend.repository.DataRepository;
import com.example.backend.repository.OrderItemRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.services.OrderItemService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private OrderItemMapper orderItemMapper;
    private OrderRepository orderRepository;
    private ProductRepository productRepository;
    private DataRepository dataRepository;

    @Override
    public OrderItemDto addOrderItem(OrderItemDto orderItemDto) {
        OrderItem orderItemEntity = orderItemMapper.toEntity(orderItemDto);
        orderItemEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now()).build());
        orderItemEntity.setRelatedOrder(orderRepository.findById(orderItemDto.getOrder().getId()).orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderItemDto.getOrder().getId())));
        orderItemEntity = orderItemRepository.save(orderItemEntity);
        return orderItemMapper.toDto(orderItemEntity);
    }

    @Override
    public List<OrderItemDto> addOrderItems(List<OrderItemDto> orderItemDtos) {
        List<OrderItem> orderItemEntities = orderItemDtos.stream()
                .map(dto -> {
                    OrderItem entity = orderItemMapper.toEntity(dto);
                    entity.setData(Data.builder()
                            .createdAt(LocalDateTime.now())
                            .updatedAt(LocalDateTime.now())
                            .build());
                    entity.setRelatedOrder(orderRepository.findById(dto.getOrder().getId())
                            .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + dto.getOrder().getId())));
                    return entity;
                })
                .toList(); // or .collect(Collectors.toList()) for Java 8

        List<OrderItem> savedItems = orderItemRepository.saveAll(orderItemEntities);
        return savedItems.stream()
                .map(OrderItemMapper::toDto)
                .toList();
    }

    @Override
    public List<OrderItemDto> findOrderItemsByOrderId(Long id){
        List<OrderItem> orderItems = orderItemRepository.findOrderItemByRelatedOrderId((long) id);
        return orderItemMapper.toDtoList(orderItems);
    }

    @Override
    public OrderItemDto updateOrderItem(Long id, OrderItemDto orderItemDto) {
        OrderItem existing = orderItemRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Order item nie istnieje!")
        );

        Order order = orderRepository.findById(orderItemDto.getOrder().getId())
                .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + orderItemDto.getOrder().getId()));

        Product product = productRepository.findById(orderItemDto.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + orderItemDto.getProductId()));

        Data data = dataRepository.findById(orderItemDto.getData().getId());

        data.setUpdatedAt(LocalDateTime.now());

        existing.setRelatedOrder(order);
        existing.setProduct(product);
        existing.setQuantity(orderItemDto.getQuantity());
        existing.setPrice(orderItemDto.getPrice());
        existing.setData(data);

        orderItemRepository.save(existing);
        return orderItemMapper.toDto(existing);
    }


    @Override
    public List<OrderItemDto> updateOrderItems(Long orderId, List<OrderItemDto> orderItemDtos) {
        List<OrderItemDto> updatedItems = new ArrayList<>();

        for (OrderItemDto dto : orderItemDtos) {
            OrderItem existing = orderItemRepository.findById(dto.getId()).orElseThrow(
                    () -> new RuntimeException("Order item with ID " + dto.getId() + " nie istnieje!")
            );

            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + dto.getProductId()));

            Data data = dataRepository.findById(dto.getData().getId());

            data.setUpdatedAt(LocalDateTime.now());

            existing.setProduct(product);
            existing.setQuantity(dto.getQuantity());
            existing.setPrice(dto.getPrice());
            existing.setData(data);

            orderItemRepository.save(existing);
            updatedItems.add(orderItemMapper.toDto(existing));
        }

        return updatedItems;
    }


    @Override
    public String deleteOrder(Long id) {
        if (orderItemRepository.existsById(id)) {
            orderItemRepository.deleteById(id);
            return "Pomyślnie usunięto order item";
        } else {
            return "Order item o podanym ID nie istnieje";
        }
    }





}
