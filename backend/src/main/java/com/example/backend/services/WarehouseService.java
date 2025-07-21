package com.example.backend.services;

import com.example.backend.dto.WarehouseAddDto;
import com.example.backend.dto.WarehouseFindDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WarehouseService {
    WarehouseAddDto addWarehouse(WarehouseAddDto warehouseAddDto);
    WarehouseFindDto findWarehouseById(Long id);
    List<WarehouseFindDto> findAllDto();
    WarehouseFindDto updateWarehouseById(WarehouseAddDto warehouseAddDto, Long id);
    String deleteWarehouse(Long id);
}
