package com.example.backend.services;

import com.example.backend.dto.OrderItemDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderItemService {
    OrderItemDto addOrderItem(OrderItemDto orderItemDto);
    List<OrderItemDto> addOrderItems(List<OrderItemDto> orderItemDtos);
}
