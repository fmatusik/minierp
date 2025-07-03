package com.example.backend.services;

import com.example.backend.dto.ProductDto;
import org.springframework.stereotype.Service;

@Service
public interface ProductService {
    ProductDto addProduct(ProductDto productDto);
}
