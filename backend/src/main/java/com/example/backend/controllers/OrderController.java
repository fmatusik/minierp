package com.example.backend.controllers;


import com.example.backend.dto.OrderAddDto;
import com.example.backend.dto.OrderFindDto;
import com.example.backend.mapper.OrderMapper;
import com.example.backend.repository.OrderRepository;
import com.example.backend.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;


    @RequestMapping("/add")
    public OrderAddDto addOrder(@RequestBody OrderAddDto orderAddDto){
        return orderService.addOrder(orderAddDto);
    }

    @RequestMapping("/all")
    public List<OrderFindDto> getAllOrders(){
        return orderService.findAllOrdersDto();
    }

}
