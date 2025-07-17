package com.example.backend.controllers;


import com.example.backend.dto.StockMovementDto;
import com.example.backend.entity.StockMovement;
import com.example.backend.services.StockMovementService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/stockMovements")
public class StockMovementController {

    private final StockMovementService stockMovementService;


    @GetMapping("/all")
    public List<StockMovementDto> getAllStockMovements(){
        return stockMovementService.findAll();
    }

    @PostMapping("/add")
    public StockMovementDto addStockMovement(@RequestBody StockMovementDto stockMovementDto){
        return stockMovementService.addStockMovement(stockMovementDto);
    }

}
