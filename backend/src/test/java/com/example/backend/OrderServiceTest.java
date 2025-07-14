package com.example.backend;

import com.example.backend.dto.*;
import com.example.backend.entity.Data;
import com.example.backend.entity.Order;
import com.example.backend.entity.Status;
import com.example.backend.mapper.OrderMapper; // Make sure this import is correct
import com.example.backend.repository.OrderRepository;
import com.example.backend.services.OrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class OrderServiceTest {

    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired // Inject OrderMapper
    private OrderMapper orderMapper;


    @Test
    void addOrder() {
        OrderDto orderDto = OrderDto.builder()
                .clientDto(
                        ClientDto.builder()
                                .id(1L)
                                .build()
                )
                .status(Status.builder()
                        .name("W realizacji")
                        .data(Data.builder()
                                .createdAt(LocalDateTime.now())
                                .updatedAt(LocalDateTime.now())
                                .build()).build())
                .data(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build())
                .price(2000L)
                .paymentStatus("W rozliczeniu")
                .addressDto(AddressDto.builder()
                        .buildingNumber("10")
                        .apartmentNumber("10a")
                        .postalCode("31-213")
                        .city("Kraków")
                        .province("Małopolska")
                        .street("Opolska")
                        .data(Data.builder()
                                .createdAt(LocalDateTime.now())
                                .updatedAt(LocalDateTime.now())
                                .build())
                        .clientId(1L)
                        .build())
                .deliveryDate(LocalDateTime.now())
                .salePlace("Online shop")
                .orderItems(List.of(OrderItemDto.builder()
                        .productId(1L)
                        .quantity(20L)
                        .price(2000L)
                        .data(Data.builder()
                                .createdAt(LocalDateTime.now())
                                .updatedAt(LocalDateTime.now())
                                .build()).build()
                ))
                .documentNumber("ORD-001")
                .build();

        // Use the injected orderMapper instance
        Order savedOrder = orderRepository.save(orderMapper.toEntity(orderDto));
    }
}