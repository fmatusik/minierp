package com.example.backend.services.impl;

import com.example.backend.dto.ProductAddDto;
import com.example.backend.dto.ProductFindDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Data;
import com.example.backend.entity.Product;
import com.example.backend.entity.Status;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.StatusRepository;
import com.example.backend.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final StatusRepository statusRepository;

    @Override
    public ProductAddDto addProduct(ProductAddDto productAddDto) {
        Category categoryEntity = categoryRepository.findById((long) productAddDto.getCategoryId());
        Status statusEntity = statusRepository.findById((long) productAddDto.getStatusId());
        Product productEntity =  ProductMapper.toEntity(productAddDto, categoryEntity, statusEntity);
        productEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build());
        productEntity = productRepository.save(productEntity);
        return ProductMapper.toDto(productEntity);
    }

    @Override
    public List<ProductFindDto> findAllDto(){
        return ProductMapper.toDtoFindList(productRepository.findAll());
    }

    @Override
    public ProductFindDto findById(Long id){
        return ProductMapper.toFindDto(productRepository.findById((long)id));
    }

}
