package com.example.backend.services;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.dto.StockLevelFindDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StockLevelService {
   StockLevelDto addStockLevel(StockLevelDto stockLevelDto);
   List<StockLevelFindDto> findAll();
   StockLevelFindDto update(Long id, StockLevelDto stockLevel);
}
