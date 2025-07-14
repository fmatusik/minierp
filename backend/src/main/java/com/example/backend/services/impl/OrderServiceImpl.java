package com.example.backend.services.impl;

import com.example.backend.dto.OrderDto;
import com.example.backend.entity.Order;
import com.example.backend.mapper.OrderMapper; // Ensure this is imported
import com.example.backend.repository.OrderRepository;
import com.example.backend.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private final OrderRepository orderRepository;
    @Autowired
    private final OrderMapper orderMapper;

    @Override
    public OrderDto addOrder(OrderDto orderDto) {
        // Call toEntity on the injected orderMapper instance
        Order orderEntity = orderMapper.toEntity(orderDto);
        orderEntity = orderRepository.save(orderEntity);
        // Call toDto on the injected orderMapper instance
        return orderMapper.toDto(orderEntity);
    }
}