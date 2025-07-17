package com.example.backend.services.impl;

import com.example.backend.dto.StockMovementItemDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.Product;
import com.example.backend.entity.StockMovement;
import com.example.backend.entity.StockMovementItem;
import com.example.backend.mapper.StockMovementItemMapper;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.StockMovementItemRepository;
import com.example.backend.repository.StockMovementRepository;
import com.example.backend.services.StockMovementItemService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@AllArgsConstructor
@Service
public class StockMovementItemServiceImpl implements StockMovementItemService {

    private final StockMovementItemRepository stockMovementItemRepository;
    private final ProductRepository productRepository;
    private final StockMovementRepository stockMovementRepository;


    @Override
    public StockMovementItemDto addStockMovementItem(StockMovementItemDto stockMovementItemDto) {
        StockMovement stockMovement = stockMovementRepository.findById( (long) stockMovementItemDto.getStockMovementId());
        Product product = productRepository.findById((long) stockMovementItemDto.getProductId());
        StockMovementItem entity = StockMovementItemMapper.toEntity(stockMovementItemDto, stockMovement, product);
        Data data = Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        entity.setData(data);
        StockMovementItem savedEntity = stockMovementItemRepository.save(entity);
        return StockMovementItemMapper.toDto(savedEntity);
    }

    @Override
    public List<StockMovementItemDto> addStockMovementItems(List<StockMovementItemDto> stockMovementItemsDto) {
        return stockMovementItemsDto.stream()
                .map(this::addStockMovementItem)
                .toList();
    }



}

