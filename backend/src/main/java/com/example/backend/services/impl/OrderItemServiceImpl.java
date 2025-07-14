package com.example.backend.services.impl;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.entity.OrderItem;
import com.example.backend.mapper.OrderItemMapper;
import com.example.backend.repository.OrderItemRepository;
import com.example.backend.services.OrderItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private final OrderItemRepository orderItemRepository;


}
