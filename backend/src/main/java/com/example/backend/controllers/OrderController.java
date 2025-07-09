package com.example.backend.controllers;


import com.example.backend.dto.OrderDto;
import com.example.backend.mapper.OrderMapper;
import com.example.backend.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;


    public OrderController(OrderRepository orderRepository, OrderMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
    }

    @GetMapping("/all")
    public List<OrderDto> getAllOrders() {
        return orderMapper.toDtoList(orderRepository.findAll());
    }

    @PostMapping
    public OrderDto addOrder(@RequestBody OrderDto orderDto) {
        return orderMapper.toDto(orderRepository.save(orderMapper.toEntity(orderDto)));

    }
}
