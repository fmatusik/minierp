package com.example.backend.services;

import com.example.backend.dto.StockMovementItemDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StockMovementItemService {
   StockMovementItemDto addStockMovementItem(StockMovementItemDto stockMovementItemDto);
   List<StockMovementItemDto> addStockMovementItems(List<StockMovementItemDto> stockMovementItemsDto);
}
