package com.example.backend.services.impl;

import com.example.backend.dto.StockMovementDto;
import com.example.backend.entity.StockMovement;
import com.example.backend.mapper.StockMovementMapper;
import com.example.backend.repository.StockMovementItemRepository;
import com.example.backend.repository.StockMovementRepository;
import com.example.backend.services.StockMovementService;
import org.hibernate.annotations.NaturalId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockMovementServiceImpl implements StockMovementService {

    private final StockMovementRepository stockMovementRepository;

    @Autowired
    public StockMovementServiceImpl(StockMovementRepository stockMovementRepository) {
        this.stockMovementRepository = stockMovementRepository;
    }

    /*@Override
    public StockMovementDto addStockMovement(StockMovementDto stockMovementDto) {
        StockMovement stockMovementEntity = StockMovementMapper.toEntity(stockMovementDto);
        StockMovement savedStockMovement = stockMovementRepository.save(stockMovementEntity);
        return StockMovementMapper.toDto(savedStockMovement);
    }*/
}
