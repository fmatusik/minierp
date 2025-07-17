package com.example.backend.services;

import com.example.backend.dto.StockMovementItemDto;
import org.springframework.stereotype.Service;

@Service
public interface StockMovementItemService {
   StockMovementItemDto addStockMovementItem(StockMovementItemDto stockMovementItemDto);
}
