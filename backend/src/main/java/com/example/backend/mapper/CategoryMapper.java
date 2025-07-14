package com.example.backend.mapper;

import com.example.backend.dto.CategoryDto;
import com.example.backend.entity.Category;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryMapper {

    public static Category toEntity(CategoryDto dto) {
        return Category.builder()
                .id(dto.getId())
                .name(dto.getName())
                .color(dto.getColor())
                .data(dto.getData())
                .products(dto.getProductsDto() != null ? ProductMapper.toEntityListWithoutCategory(dto.getProductsDto()) : null)
                .build();
    }

    public static CategoryDto toDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .color(category.getColor())
                .data(category.getData())
                .productsDto(category.getProducts() != null ? ProductMapper.toDtoList(category.getProducts()) : null)
                .productCount(category.getProducts() != null ? category.getProducts().size() : 0)
                .build();
    }

    public static CategoryDto toDtoWithoutProduct(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .color(category.getColor())
                .data(category.getData())
                .productCount(category.getProducts() != null ? category.getProducts().size() : 0)
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
