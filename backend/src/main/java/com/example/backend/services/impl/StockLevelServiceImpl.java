package com.example.backend.services.impl;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.dto.StockLevelFindDto;
import com.example.backend.dto.WarehouseFindDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.Product;
import com.example.backend.entity.StockLevel;
import com.example.backend.entity.Warehouse;
import com.example.backend.mapper.StockLevelMapper;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.StockLevelRepository;
import com.example.backend.repository.WarehouseRepository;
import com.example.backend.services.StockLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StockLevelServiceImpl implements StockLevelService {

    private final StockLevelRepository stockLevelRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;

    @Autowired
    public StockLevelServiceImpl(StockLevelRepository stockLevelRepository, ProductRepository productRepository, WarehouseRepository warehouseRepository) {
        this.stockLevelRepository = stockLevelRepository;
        this.productRepository = productRepository;
        this.warehouseRepository = warehouseRepository;
    }



    @Override
    public StockLevelDto addStockLevel(StockLevelDto stockLevelDto) {
        Product product = productRepository.findById(stockLevelDto.getProductId()).orElseThrow(()->new RuntimeException("Nie znaleziono produktu o podanym ID"));
        Warehouse warehouse = warehouseRepository.findById(stockLevelDto.getWarehouseId()).orElseThrow(()->new RuntimeException("Nie znaleziono magazynu o podanym ID"));
        StockLevel stockLevelEntity = StockLevelMapper.toEntity(stockLevelDto, product, warehouse);
        stockLevelEntity.setData(
                Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build()
        );
        StockLevel stockLevelSaved = stockLevelRepository.save(stockLevelEntity);
        return StockLevelMapper.toDto(stockLevelSaved);
    }

    @Override
    public List<StockLevelFindDto> findAll() {
        return StockLevelMapper.toDtoFindList(stockLevelRepository.findAll());
    }

    @Override
    public StockLevelFindDto update(Long id, StockLevelDto stockLevel) {
        var existing = stockLevelRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono pozycji na magazynie o podanym ID"));
        existing.setQuantity(stockLevel.getQuantity());
        Data data = existing.getData();
        data.setUpdatedAt(LocalDateTime.now());
        existing.setData(data);
        StockLevel updated = stockLevelRepository.save(existing);
        return StockLevelMapper.toFindDto(updated);
    }
}
