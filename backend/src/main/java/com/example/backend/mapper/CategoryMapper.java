package com.example.backend.mapper;

import com.example.backend.dto.CategoryDto;
import com.example.backend.entity.Category;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryMapper {

    public static Category toEntity(CategoryDto dto) {
        return Category.builder()
                .id(dto.getId())
                .name(dto.getName())
                .data(dto.getData())
                .products(dto.getProductsDto() != null ? ProductMapper.toEntityListWithoutCategory(dto.getProductsDto()) : null)
                .build();
    }

    public static CategoryDto toDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .data(category.getData())
                .productsDto(category.getProducts() != null ? ProductMapper.toDtoList(category.getProducts()) : null)
                .build();
    }

    public static List<Category> toEntityList(List<CategoryDto> dtoList) {
        return dtoList.stream()
                .map(CategoryMapper::toEntity)
                .collect(Collectors.toList());
    }

    public static List<CategoryDto> toDtoList(List<Category> entityList) {
        return entityList.stream()
                .map(CategoryMapper::toDto)
                .collect(Collectors.toList());
    }
}
