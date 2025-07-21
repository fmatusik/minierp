package com.example.backend.services;

import com.example.backend.dto.ProductAddDto;
import com.example.backend.dto.ProductFindDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {
   ProductAddDto addProduct(ProductAddDto productAddDto);
   List<ProductFindDto> findAllDto();
   ProductFindDto findById(Long id);
   ProductFindDto updateProduct(Long id, ProductAddDto updatedProductDto);
   String deleteProduct(Long id);
}
