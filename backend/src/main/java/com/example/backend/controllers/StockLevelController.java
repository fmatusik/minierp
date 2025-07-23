package com.example.backend.controllers;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.dto.StockLevelFindDto;
import com.example.backend.services.StockLevelService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

    @GetMapping("/checkIfExists/{productId}/{warehouseId}")
    public Boolean checkIfExists(@PathVariable Long productId, @PathVariable Long warehouseId){
        return stockLevelService.checkIfExists(productId, warehouseId);
    }

    @PutMapping("/update/{id}")
    public StockLevelFindDto updateStockLevel(@PathVariable Long id, @RequestBody StockLevelDto stockLevel) {
        return stockLevelService.update(id, stockLevel);
    }

    @PutMapping("/append/{id}")
    public StockLevelFindDto appendStockLevel(@PathVariable Long id, @RequestBody Long quantity) {
        return stockLevelService.appendStockLevel(id, quantity);
    }
    @PutMapping("/decrease/{id}")
    public StockLevelFindDto decreaseStockLevel(@PathVariable Long id, @RequestBody Long quantity) {
        return  stockLevelService.decreaseStockLevel(id, quantity);
    }

    @GetMapping("/warehouse/{id}")
    public List<StockLevelFindDto> findStockLevelsByWarehouseId(@PathVariable Long id){
        return stockLevelService.findStockLevelByWarehouseId(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStockLevel(@PathVariable Long id) {
        return stockLevelService.deleteStockLevel(id);
    }

    @GetMapping("/csv/all")
    public ResponseEntity<byte[]> exportStockLevelsToCsv() throws IOException {
        return stockLevelService.exportStockLevelsToCSV();
    }


}
