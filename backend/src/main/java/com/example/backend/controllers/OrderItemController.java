package com.example.backend.controllers;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.mapper.OrderItemMapper;
import com.example.backend.services.OrderItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/orderItems")
public class OrderItemController {

    private final OrderItemMapper orderItemMapper;
    private final OrderItemService orderItemService;



    @PostMapping("/add/list")
    public List<OrderItemDto> addOrder(@RequestBody List<OrderItemDto> orderItemsDto) {
        return orderItemService.addOrderItems(orderItemsDto);
    }


}
