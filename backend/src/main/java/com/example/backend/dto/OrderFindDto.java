package com.example.backend.dto;

import com.example.backend.entity.Data;
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
public class OrderFindDto{
    private Long id;
    private ClientDto clientDto;
    private StatusDto statusDto;
    private Data data;
    private double price;
    private String paymentStatus;
    private AddressDto addressDto;
    private LocalDateTime deliveryDate;
    private String documentNumber;
    private String salePlace;
    private List<OrderItemDto> orderItems;
}
