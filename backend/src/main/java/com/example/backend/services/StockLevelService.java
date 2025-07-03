package com.example.backend.services;

import com.example.backend.dto.StockLevelDto;
import org.springframework.stereotype.Service;

@Service
public interface StockLevelService {
    StockLevelDto addStockLevel(StockLevelDto stockLevelDto);
}
