package com.example.backend.services.impl;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.OrderItem;
import com.example.backend.mapper.OrderItemMapper;
import com.example.backend.mapper.OrderMapper;
import com.example.backend.repository.OrderItemRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.services.OrderItemService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private final OrderItemRepository orderItemRepository;
    @Autowired
    private OrderItemMapper orderItemMapper;
    private OrderRepository orderRepository;

    @Override
    public OrderItemDto addOrderItem(OrderItemDto orderItemDto) {
        OrderItem orderItemEntity = orderItemMapper.toEntity(orderItemDto);
        orderItemEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now()).build());
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
                    entity.setRelatedOrder(orderRepository.findById(dto.getOrderId())
                            .orElseThrow(() -> new EntityNotFoundException("Order not found with ID: " + dto.getOrderId())));
                    return entity;
                })
                .toList(); // or .collect(Collectors.toList()) for Java 8

        List<OrderItem> savedItems = orderItemRepository.saveAll(orderItemEntities);
        return savedItems.stream()
                .map(OrderItemMapper::toDto)
                .toList();
    }




}
