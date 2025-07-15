package com.example.backend.services.impl;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.OrderItem;
import com.example.backend.mapper.OrderItemMapper;
import com.example.backend.mapper.OrderMapper;
import com.example.backend.repository.OrderItemRepository;
import com.example.backend.services.OrderItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private final OrderItemRepository orderItemRepository;
    @Autowired
    private OrderItemMapper orderItemMapper;


    @Override
    public OrderItemDto addOrderItem(OrderItemDto orderItemDto) {
        OrderItem orderItemEntity = orderItemMapper.toEntity(orderItemDto);
        orderItemEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now()).build());
        orderItemEntity = orderItemRepository.save(orderItemEntity);
        return orderItemMapper.toDto(orderItemEntity);
    }
}
