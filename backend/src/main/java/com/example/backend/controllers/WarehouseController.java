package com.example.backend.controllers;

import com.example.backend.dto.WarehouseAddDto;
import com.example.backend.dto.WarehouseFindDto;
import com.example.backend.repository.WarehouseRepository;
import com.example.backend.services.WarehouseService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/warehouse")
public class WarehouseController {

    private final WarehouseService warehouseService;

    @PostMapping("/add")
    public WarehouseAddDto addWarehouse(@RequestBody WarehouseAddDto warehouseAddDto){
        return warehouseService.addWarehouse(warehouseAddDto);
    }

    @GetMapping("/all")
    public List<WarehouseFindDto> getAllWarehouses(){
        return warehouseService.findAllDto();
    }

    @GetMapping("/one/{id}")
    public WarehouseFindDto getOneWarehouse(@PathVariable Long id){
        return warehouseService.findWarehouseById(id);
    }

    @PutMapping("/update/{id}")
    public WarehouseFindDto updateWarehouse(@PathVariable Long id, @RequestBody WarehouseAddDto warehouseAddDto){
        return warehouseService.updateWarehouseById(warehouseAddDto, id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteWarehouse(@PathVariable Long id){
        return warehouseService.deleteWarehouse(id);
    }
}
