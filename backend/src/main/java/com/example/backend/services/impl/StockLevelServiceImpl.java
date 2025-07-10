package com.example.backend.services.impl;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.entity.StockLevel;
import com.example.backend.mapper.StockLevelMapper;
import com.example.backend.repository.StockLevelRepository;
import com.example.backend.services.StockLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockLevelServiceImpl implements StockLevelService {

    private final StockLevelRepository stockLevelRepository;

    @Autowired
    public StockLevelServiceImpl(StockLevelRepository stockLevelRepository) {
        this.stockLevelRepository = stockLevelRepository;
    }



    /*@Override
    public StockLevelDto addStockLevel(StockLevelDto stockLevelDto) {
        StockLevel stockLevelEntity = StockLevelMapper.toEntity(stockLevelDto);
        StockLevel stockLevelSaved = stockLevelRepository.save(stockLevelEntity);
        return StockLevelMapper.toDto(stockLevelSaved);
    }*/
}
