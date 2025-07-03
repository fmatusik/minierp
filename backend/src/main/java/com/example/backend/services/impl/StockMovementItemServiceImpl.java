package com.example.backend.services.impl;

import com.example.backend.dto.StockMovementItemDto;
import com.example.backend.entity.StockMovementItem;
import com.example.backend.mapper.StockMovementItemMapper;
import com.example.backend.repository.StockMovementItemRepository;
import com.example.backend.services.StockMovementItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class StockMovementItemServiceImpl implements StockMovementItemService {

    private final StockMovementItemRepository stockMovementItemRepository;

    @Autowired
    public StockMovementItemServiceImpl(StockMovementItemRepository stockMovementItemRepository) {
        this.stockMovementItemRepository = stockMovementItemRepository;
    }

    @Override
    public StockMovementItemDto addStockMovementItem(StockMovementItemDto stockMovementItemDto) {
        StockMovementItem entity = StockMovementItemMapper.toEntity(stockMovementItemDto); // Convert DTO to entity
        StockMovementItem savedEntity = stockMovementItemRepository.save(entity); // Save entity
        return StockMovementItemMapper.toDto(savedEntity);
    }
}

