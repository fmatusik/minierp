package com.example.backend.services;

import com.example.backend.dto.StockMovementDto;
import com.example.backend.dto.StockMovementFindDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface StockMovementService {
    StockMovementDto addStockMovement(StockMovementDto stockMovementDto);
    List<StockMovementFindDto> findAll();
    String deleteById(Long id);
    ResponseEntity<byte[]> exportStockMovementsToCSV() throws IOException;
}
