package com.example.backend.controllers;


import com.example.backend.dto.OrderAddDto;
import com.example.backend.dto.OrderFindDto;
import com.example.backend.mapper.OrderMapper;
import com.example.backend.repository.OrderRepository;
import com.example.backend.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

    @RequestMapping("/one/{id}")
    public OrderFindDto getOrderById(@PathVariable Long id) { return orderService.findById(id); }

    @PutMapping("/update/{id}")
    public OrderFindDto updateOrder(@RequestBody OrderAddDto updatedOrderDto, @PathVariable Long id) {
        return orderService.updateOrder(updatedOrderDto, id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteOrder(@PathVariable Long id) {
        return orderService.deleteOrder(id);
    }

    @GetMapping("/csv/all")
    public ResponseEntity<byte[]> exportOrdersToCsv() throws IOException {
        return orderService.exportOrdersToCSV();
    }

}
