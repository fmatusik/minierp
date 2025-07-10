package com.example.backend;


import com.example.backend.dto.CategoryDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Data;
import com.example.backend.mapper.CategoryMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.services.CategoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
public class CategoryServiceTest {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;


    @Test
    void addCategory() {
        CategoryDto categoryDto = CategoryDto.builder()
                .name("Laptop")
                .data(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build()
                )
                .build();

        Category category = categoryRepository.save(CategoryMapper.toEntity(categoryDto));

        //return category;
    }
}
