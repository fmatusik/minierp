package com.example.backend.controllers;

import com.example.backend.dto.StockMovementItemDto;
import com.example.backend.services.StockMovementItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/stockMovementItems")
public class StockMovementItemsController {

    private final StockMovementItemService stockMovementItemService;

    @PutMapping("/add")
    public StockMovementItemDto addStockMovementItem(@RequestBody StockMovementItemDto stockMovementItemDto){
        return stockMovementItemService.addStockMovementItem(stockMovementItemDto);
    }
}
