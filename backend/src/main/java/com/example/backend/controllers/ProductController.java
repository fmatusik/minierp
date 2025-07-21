package com.example.backend.controllers;

import com.example.backend.dto.ProductAddDto;
import com.example.backend.dto.ProductFindDto;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.ProductRepository;
import com.example.backend.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductService productService;


    @PostMapping("/add")
    public ProductAddDto addProduct(@RequestBody ProductAddDto productAddDto){
        return productService.addProduct(productAddDto);
    }

    @GetMapping("/all")
    public List<ProductFindDto> allProducts(){
        return productService.findAllDto();
    }

    @GetMapping("/one/{id}")
    public ProductFindDto findOneProduct(@PathVariable Long id){
        return productService.findById(id);
    }

    @PutMapping("/update/{id}")
    public ProductFindDto updateProduct(@PathVariable Long id, @RequestBody ProductAddDto updatedProductDto){
        return productService.updateProduct(id, updatedProductDto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable Long id){
        return productService.deleteProduct(id);
    }

}




