package com.example.backend.services.impl;

import com.example.backend.dto.CategoryDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Data;
import com.example.backend.mapper.CategoryMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;

    @Override
    public CategoryDto addCategory(CategoryDto categoryDto) {
        Category categoryEntity = CategoryMapper.toEntity(categoryDto);
        categoryEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now()).build()
        );
        categoryEntity = categoryRepository.save(categoryEntity);
        return CategoryMapper.toDto(categoryEntity);
    }

    @Override
    public List<CategoryDto> findAllDto(){
        return CategoryMapper.toDtoList(categoryRepository.findAll());
    }

    @Override
    public CategoryDto getDtoById(Long id){
        return CategoryMapper.toDto(categoryRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono kategorii o id: "+id)));
    }
}
