package com.example.backend.mapper;

import com.example.backend.dto.*;
import com.example.backend.entity.Address;
import com.example.backend.entity.Client;
import com.example.backend.entity.Order;
import com.example.backend.entity.Status;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class OrderMapper {

    private final OrderItemMapper orderItemMapper;

    public static OrderAddDto toDto(Order order) {
        return OrderAddDto.builder()
                .id(order.getId())
                .clientId(order.getClient() != null ? ClientMapper.toDto(order.getClient()).getId() : null)
                .statusId(order.getStatus().getId())
                .data(order.getData())
                .price(order.getPrice())
                .paymentStatus(order.getPaymentStatus())
                .addressId(order.getAddress() != null ? AddressMapper.toDto(order.getAddress()).getId() : null)
                .deliveryDate(order.getDeliveryDate())
                .documentNumber(order.getDocumentNumber())
                .salePlace(order.getSalePlace())
                .orderItems(order.getOrderItems() != null ? OrderItemMapper.toDtoList(order.getOrderItems()) : null)
                .build();
    }

    public Order toEntity(OrderAddDto orderAddDto, Client client, Status status, Address address) {
        return Order.builder()
                .id(orderAddDto.getId())
                .client(client)
                .status(status)
                .data(orderAddDto.getData())
                .price(orderAddDto.getPrice())
                .paymentStatus(orderAddDto.getPaymentStatus())
                .deliveryDate(orderAddDto.getDeliveryDate())
                .documentNumber(orderAddDto.getDocumentNumber())
                .salePlace(orderAddDto.getSalePlace())
                .address(address)
                .orderItems(orderAddDto.getOrderItems() != null ? orderItemMapper.toEntityList(orderAddDto.getOrderItems()) : null) // Use the injected instance
                .build();
    }

    public static List<OrderAddDto> toDtoList(List<Order> entityList) {
        return entityList.stream()
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }


    public static OrderFindDto toDtoFind(Order order, ClientDto client, StatusDto status, AddressDto address) {
        return OrderFindDto.builder()
                .id(order.getId())
                .clientDto(client)
                .statusDto(status)
                .data(order.getData())
                .price(order.getPrice())
                .paymentStatus(order.getPaymentStatus())
                .addressDto(address)
                .deliveryDate(order.getDeliveryDate())
                .documentNumber(order.getDocumentNumber())
                .salePlace(order.getSalePlace())
                .orderItems(order.getOrderItems() != null ? OrderItemMapper.toDtoList(order.getOrderItems()) : null)
                .build();
    }

    public List<OrderFindDto> toDtoFindList(List<Order> orders){
        return orders.stream()
                .map(order -> toDtoFind(
                        order,
                        order.getClient() != null ? ClientMapper.toDto(order.getClient()) : null,
                        order.getStatus() != null ? StatusMapper.toDto(order.getStatus()) : null,
                        order.getAddress() != null ? AddressMapper.toDto(order.getAddress()) : null
                ))
                .collect(Collectors.toList());
    }


    public static OrderFindDto toDtoFindWithoutOrderItemStatusAndAddress(Order order) {
        return OrderFindDto.builder()
                .id(order.getId())
                .data(order.getData())
                .price(order.getPrice())
                .paymentStatus(order.getPaymentStatus())
                .deliveryDate(order.getDeliveryDate())
                .documentNumber(order.getDocumentNumber())
                .salePlace(order.getSalePlace())
                .clientDto(ClientMapper.toDtoWithoutContactsAndAddresses(order.getClient()))
                .build();
    }


}