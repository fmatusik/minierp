package com.example.backend.services.impl;

import com.example.backend.dto.WarehouseDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.Warehouse;
import com.example.backend.mapper.WarehouseMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.WarehouseRepository;
import com.example.backend.services.WarehouseService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final AddressRepository addressRepository;

    @Override
    public WarehouseDto addWarehouse(WarehouseDto warehouseDto) {
        Warehouse warehouseEntity = WarehouseMapper.toEntity(warehouseDto);
        warehouseEntity.setData(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                .build());
        Warehouse warehouseSaved = warehouseRepository.save(warehouseEntity);
        return WarehouseMapper.toDto(warehouseSaved);
    }
}
