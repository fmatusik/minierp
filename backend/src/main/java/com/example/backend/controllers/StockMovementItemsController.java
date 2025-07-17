package com.example.backend.controllers;

import com.example.backend.dto.StockMovementItemDto;
import com.example.backend.services.StockMovementItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/stockMovementItems")
public class StockMovementItemsController {

    private final StockMovementItemService stockMovementItemService;

    @PostMapping("/add")
    public StockMovementItemDto addStockMovementItem(@RequestBody StockMovementItemDto stockMovementItemDto){
        return stockMovementItemService.addStockMovementItem(stockMovementItemDto);
    }

    @PostMapping("/add/list")
    public List<StockMovementItemDto> addStockMovementItems(@RequestBody List<StockMovementItemDto> stockMovementItemsDto){
        return stockMovementItemService.addStockMovementItems(stockMovementItemsDto);
    }
}
