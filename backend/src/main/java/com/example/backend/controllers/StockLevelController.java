package com.example.backend.controllers;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.dto.StockLevelFindDto;
import com.example.backend.services.StockLevelService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/stockLevels")
public class StockLevelController {


    private final StockLevelService stockLevelService;

    @PostMapping("/add")
    public StockLevelDto addStockLevel(@RequestBody StockLevelDto stockLevelDto){
        return stockLevelService.addStockLevel(stockLevelDto);
    }

    @GetMapping("/all")
    public List<StockLevelFindDto> getAllStockLevels(){
        return stockLevelService.findAll();
    }

    @PutMapping("/update/{id}")
    public StockLevelFindDto updateStockLevel(@PathVariable Long id, @RequestBody StockLevelDto stockLevel) {
        return stockLevelService.update(id, stockLevel);
    }
}
