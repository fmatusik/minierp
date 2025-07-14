package com.example.backend.controllers;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Product;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.ProductRepository;
import com.example.backend.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.sound.sampled.Port;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductService productService;


    @PostMapping("/add")
    public ProductDto addProduct(@RequestBody ProductDto productDto){
        return productService.addProduct(productDto);
    }
}
