package com.example.backend;

import com.example.backend.dto.ImageDto;
import com.example.backend.dto.ProductDto;
import com.example.backend.dto.StatusDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Data;
import com.example.backend.entity.Product;
import com.example.backend.mapper.CategoryMapper;
import com.example.backend.mapper.ProductMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class ProductServiceTest {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    @Rollback(value = false)
    @Test
    void addProduct() {

        Category category = categoryRepository.findById(1L);

        ProductDto productDto = ProductDto.builder()
                .name("Huawei Matebook")
                .price(2000.00F)
                .data(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build())
                .description("Opis")
                .notes("notka")
                .sku("2523f")
                .weight(355F)
                .dimensions(34F)
                .categoryId(CategoryMapper.toDto(category).getId())
                .statusDto(StatusDto.builder()
                        .name("Dostępny")
                        .data(Data.builder()
                                .createdAt(LocalDateTime.now())
                                .updatedAt(LocalDateTime.now())
                                .build()).build())
                .imagesDto(List.of(
                        ImageDto.builder()
                                .path("path")
                                .alt("alt")
                                .size(100L)
                                .isThumbnail(true)
                                .data(Data.builder()
                                        .createdAt(LocalDateTime.now())
                                        .updatedAt(LocalDateTime.now()).build())
                                .build(),
                        ImageDto.builder()
                                .path("path2")
                                .alt("alt2")
                                .size(100L)
                                .isThumbnail(true)
                                .data(Data.builder()
                                        .createdAt(LocalDateTime.now())
                                        .updatedAt(LocalDateTime.now()).build())
                                .build()
                ))
                .build();


        Product product = productRepository.save(productMapper.toEntity(productDto, category));

        //return product
    }
}
