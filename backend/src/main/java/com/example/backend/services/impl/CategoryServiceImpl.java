package com.example.backend.services.impl;

import com.example.backend.dto.CategoryDto;
import com.example.backend.entity.Category;
import com.example.backend.mapper.CategoryMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;

    @Override
    public CategoryDto addCategory(CategoryDto categoryDto) {
        Category categoryEntity = CategoryMapper.toEntity(categoryDto);
        categoryEntity = categoryRepository.save(categoryEntity);
        return CategoryMapper.toDto(categoryEntity);
    }
}
