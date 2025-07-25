package com.example.backend.services;

import com.example.backend.dto.OrderAddDto;
import com.example.backend.dto.OrderFindDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface OrderService {
    OrderAddDto addOrder(OrderAddDto orderAddDto);
    List<OrderFindDto> findAllOrdersDto();
    OrderFindDto findById(Long id);
    OrderFindDto updateOrder(OrderAddDto orderAddDto, Long id);
    String deleteOrder(Long id);
    ResponseEntity<byte[]> exportOrdersToCSV() throws IOException;
}
