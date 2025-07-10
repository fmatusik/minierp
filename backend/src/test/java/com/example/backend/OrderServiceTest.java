package com.example.backend;

import com.example.backend.dto.OrderDto;
import com.example.backend.services.OrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class OrderServiceTest {

    @Autowired
    OrderService orderService;

/*    @Test
    void testAdd() {
        OrderDto orderDto = OrderDto.builder().build();
        orderService.addOrder(orderDto);
    }*/
}
