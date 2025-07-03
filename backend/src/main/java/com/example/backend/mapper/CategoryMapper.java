package com.example.backend.mapper;

import com.example.backend.dto.CategoryDto;
import com.example.backend.entity.Category;

public class CategoryMapper {


    public static Category toEntity(CategoryDto dto) {
        return Category.builder()
                .id(dto.getId())
                .name(dto.getName())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .product(dto.getProduct())
                .build();
    }


    public static CategoryDto toDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .product(category.getProduct())
                .build();
    }

}
