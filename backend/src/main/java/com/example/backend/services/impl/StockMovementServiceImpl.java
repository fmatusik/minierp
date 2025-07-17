package com.example.backend.services.impl;

import com.example.backend.dto.OrderAddDto;
import com.example.backend.dto.StockMovementDto;
import com.example.backend.entity.*;
import com.example.backend.mapper.StockMovementMapper;
import com.example.backend.repository.*;
import com.example.backend.services.StockMovementService;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.NaturalId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class StockMovementServiceImpl implements StockMovementService {

    private final StockMovementRepository stockMovementRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final WarehouseRepository warehouseRepository;


    @Override
    public StockMovementDto addStockMovement(StockMovementDto stockMovementDto) {
        Order order = null;
        if(stockMovementDto.getRelatedOrderId() != null ) {
            order = orderRepository.findById( (long) stockMovementDto.getRelatedOrderId());
        }

        Warehouse sourceWarehouse = warehouseRepository.findById((long) stockMovementDto.getSourceWarehouseId());
        Warehouse targetWarehouse = warehouseRepository.findById((long) stockMovementDto.getTargetWarehouseId());
        StockMovement stockMovementEntity = StockMovementMapper.toEntity(stockMovementDto, order != null ? order : null, sourceWarehouse, targetWarehouse);
        Data data = Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        stockMovementEntity.setData(data);
        StockMovement savedStockMovement = stockMovementRepository.save(stockMovementEntity);
        return StockMovementMapper.toDto(savedStockMovement);
    }
}
