package com.example.backend.controllers;

import com.example.backend.dto.OrderItemDto;
import com.example.backend.mapper.OrderItemMapper;
import com.example.backend.services.OrderItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public OrderItemDto addOrderItem(@RequestBody OrderItemDto orderItemDto){
        return orderItemService.addOrderItem(orderItemDto);
    }

    @GetMapping("/order/{id}")
    public List<OrderItemDto> findOrderItemsByOrderId(@PathVariable Long id){
        return orderItemService.findOrderItemsByOrderId(id);
    }

    @PutMapping("/update/list/{id}")
    public List<OrderItemDto> updateOrders(@PathVariable Long id, @RequestBody List<OrderItemDto> orderItemsDto){
        return orderItemService.updateOrderItems(id, orderItemsDto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteOrderItem(@PathVariable Long id) {
        return orderItemService.deleteOrder(id);
    }


}
