package com.example.backend;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.Product;
import com.example.backend.entity.StockLevel;
import com.example.backend.entity.Warehouse;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.StockLevelRepository;
import com.example.backend.repository.WarehouseRepository;
import com.example.backend.services.StockLevelService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class StockLevelServiceTest {

/*    @Autowired
    private StockLevelService stockLevelService;

    @Autowired
    private StockLevelRepository stockLevelRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Test
    void addStockLevel() {

        StockLevelDto stockLevelDto = StockLevelDto.builder()
                .productId(1L)
                .warehouseDto()

    }*/
}
