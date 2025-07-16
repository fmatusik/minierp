package com.example.backend.controllers;

import com.example.backend.dto.WarehouseDto;
import com.example.backend.services.WarehouseService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/warehouse")
public class WarehouseController {

    private final WarehouseService warehouseService;

    @PostMapping("/add")
    public WarehouseDto addWarehouse(@RequestBody WarehouseDto warehouseDto){
        return warehouseService.addWarehouse(warehouseDto);
    }
}
