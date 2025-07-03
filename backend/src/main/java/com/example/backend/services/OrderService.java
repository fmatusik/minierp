package com.example.backend.services;

import com.example.backend.dto.OrderDto;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {
    OrderDto addOrder(OrderDto orderDto);
}
