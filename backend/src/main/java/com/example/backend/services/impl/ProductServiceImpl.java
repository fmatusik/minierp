package com.example.backend.services.impl;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Data;
import com.example.backend.entity.Product;
import com.example.backend.mapper.CategoryMapper;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProductServiceImpl implements ProductService {

    private final CategoryRepository categoryRepository;
    ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductDto addProduct(ProductDto productDto) {

        Product productEntity =  ProductMapper.toEntity(productDto, CategoryMapper.toEntity(productDto.getCategoryDto()));
        productEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build());
        productEntity = productRepository.save(productEntity);
        return ProductMapper.toDto(productEntity);
    }
}
