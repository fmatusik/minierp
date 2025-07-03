package com.example.backend.dto;

import com.example.backend.entity.Address;
import com.example.backend.entity.Client;
import com.example.backend.entity.OrderItem;
import com.example.backend.entity.StockMovement;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Builder
@Getter
public class OrderDto {
    private Long id;
    private Client client;
    private String orderStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long price;
    private String paymentStatus;
    private Address address;
    private LocalDate deliveryDate;
    private Long documentNumber;
    private String salePlace;
    private List<StockMovement> stockMovements;

}

