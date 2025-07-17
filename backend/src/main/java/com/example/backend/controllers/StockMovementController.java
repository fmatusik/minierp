package com.example.backend.controllers;


import com.example.backend.dto.StockMovementDto;
import com.example.backend.entity.StockMovement;
import com.example.backend.services.StockMovementService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/stockMovements")
public class StockMovementController {

    private final StockMovementService stockMovementService;

    @PostMapping("/add")
    public StockMovementDto addStockMovement(@RequestBody StockMovementDto stockMovementDto){
        return stockMovementService.addStockMovement(stockMovementDto);
    }

}
