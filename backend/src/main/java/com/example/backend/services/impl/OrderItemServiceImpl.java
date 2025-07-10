package com.example.backend.services.impl;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.entity.OrderItem;
import com.example.backend.mapper.OrderItemMapper;
import com.example.backend.repository.OrderItemRepository;
import com.example.backend.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;

    @Autowired
    public OrderItemServiceImpl(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }


    /*@Override
    public OrderItemDto addOrderItem(OrderItemDto orderItemDto) {
        OrderItem orderItemEntity = OrderItemMapper.toEntity(orderItemDto);
        OrderItem orderItemSaved = orderItemRepository.save(orderItemEntity);
        return OrderItemMapper.toDto(orderItemSaved);
    }*/
}
