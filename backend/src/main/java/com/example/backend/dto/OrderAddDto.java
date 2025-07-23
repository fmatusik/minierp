package com.example.backend.dto;

import com.example.backend.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Builder
@Getter
@Setter
public class OrderAddDto {
    private Long id;
    private Long clientId;
    private Long statusId;
    private Data data;
    private double price;
    private String paymentStatus;
    private Long addressId;
    private LocalDateTime deliveryDate;
    private String documentNumber;
    private String salePlace;
    private List<OrderItemDto> orderItems;
}

