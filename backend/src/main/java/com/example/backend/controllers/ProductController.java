package com.example.backend.controllers;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Product;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductController(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    /*@GetMapping("/basic")
    public List<ProductDto> getBasicProductInfo() {
        return productMapper.toDtoList(productRepository.findAll());
    }

    @PostMapping
    public ProductDto createProduct(@RequestBody ProductDto productDto) {
        Product product = productMapper.toEntity(productDto);
        Product saved = productRepository.save(product);
        return productMapper.toDto(saved);
    }*/
}
