package com.example.backend.services.impl;

import com.example.backend.dto.WarehouseDto;
import com.example.backend.entity.Warehouse;
import com.example.backend.mapper.WarehouseMapper;
import com.example.backend.repository.WarehouseRepository;
import com.example.backend.services.WarehouseService;
import org.springframework.stereotype.Service;

@Service
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;

    public WarehouseServiceImpl(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }


    /*@Override
    public WarehouseDto addWarehouse(WarehouseDto warehouseDto) {
        Warehouse warehouseEntity = WarehouseMapper.toEntity(warehouseDto);
        Warehouse warehouseSaved = warehouseRepository.save(warehouseEntity);
        return WarehouseMapper.toDto(warehouseSaved);
    }*/
}
