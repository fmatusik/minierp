package com.example.backend.services.impl;

import com.example.backend.dto.OrderDto;
import com.example.backend.entity.Order;
import com.example.backend.mapper.OrderMapper;
import com.example.backend.repository.OrderRepository;
import com.example.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    /*@Override
    public OrderDto addOrder(OrderDto orderDto) {
        Order orderEnity = OrderMapper.toEntity(orderDto);
        orderEnity = orderRepository.save(orderEnity);
        return OrderMapper.toDto(orderEnity);
    }*/
}
