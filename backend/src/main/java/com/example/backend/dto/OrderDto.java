package com.example.backend.dto;

import com.example.backend.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Builder
@Getter
public class OrderDto {
    private Long id;
    private ClientDto clientDto;
    private Status status;
    private Data data;
    private Long price;
    private String paymentStatus;
    private AddressDto addressDto;
    private LocalDateTime deliveryDate;
    private String documentNumber;
    private String salePlace;
    private List<StockMovementDto> stockMovementsDto;
    private List<OrderItemDto> orderItems;

}

