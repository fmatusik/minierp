package com.example.backend.services;

import com.example.backend.dto.StockMovementDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StockMovementService {
    StockMovementDto addStockMovement(StockMovementDto stockMovementDto);
    List<StockMovementDto> findAll();
}
