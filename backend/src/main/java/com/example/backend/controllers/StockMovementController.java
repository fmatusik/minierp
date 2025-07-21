package com.example.backend.controllers;


import com.example.backend.dto.StockMovementDto;
import com.example.backend.dto.StockMovementFindDto;
import com.example.backend.services.StockMovementService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/stockMovements")
public class StockMovementController {

    private final StockMovementService stockMovementService;


    @GetMapping("/all")
    public List<StockMovementFindDto> getAllStockMovements(){
        return stockMovementService.findAll();
    }

    @PostMapping("/add")
    public StockMovementDto addStockMovement(@RequestBody StockMovementDto stockMovementDto){
        return stockMovementService.addStockMovement(stockMovementDto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStockMovement(@PathVariable Long id){
        return stockMovementService.deleteById(id);
    }

    @GetMapping("/csv/all")
    public ResponseEntity<byte[]> exportStockMovementsToCsv() throws IOException {
        return stockMovementService.exportStockMovementsToCSV();
    }

}
