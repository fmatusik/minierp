package com.example.backend.services.impl;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Product;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        Category category = categoryRepository.findById( (long) productDto.getCategoryId());
        Product productEntity =  ProductMapper.toEntity(productDto, category);
        productEntity = productRepository.save(productEntity);
        return ProductMapper.toDto(productEntity);
    }
}
