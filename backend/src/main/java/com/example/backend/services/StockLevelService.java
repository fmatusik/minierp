package com.example.backend.services;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.dto.StockLevelFindDto;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface StockLevelService {
   StockLevelDto addStockLevel(StockLevelDto stockLevelDto);
   List<StockLevelFindDto> findAll();
   StockLevelFindDto update(Long id, StockLevelDto stockLevel);
   List<StockLevelFindDto> findStockLevelByWarehouseId(Long id);
   StockLevelFindDto appendStockLevel(Long id, Long quantity);
   StockLevelFindDto decreaseStockLevel(Long id, Long quantity);
   Boolean checkIfExists(Long productId, Long warehouseId);
   String deleteStockLevel(Long id);
   ResponseEntity<byte[]> exportStockLevelsToCSV() throws IOException;
}
