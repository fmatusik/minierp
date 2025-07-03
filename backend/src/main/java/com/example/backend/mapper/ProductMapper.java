package com.example.backend.mapper;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Product;

public class ProductMapper {

    public static ProductDto toDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .description(product.getDescription())
                .notes(product.getNotes())
                .sku(product.getSku())
                .weight(product.getWeight())
                .description(product.getDescription())
                .status(product.getStatus())
                .categories(product.getCategories())
                .images(product.getImages())
                .stockLevels(product.getStockLevels())
                .build();
    }

    public static Product toEntity(ProductDto productDto) {
        return Product.builder()
                .id(productDto.getId())
                .name(productDto.getName())
                .price(productDto.getPrice())
                .createdAt(productDto.getCreatedAt())
                .updatedAt(productDto.getUpdatedAt())
                .description(productDto.getDescription())
                .notes(productDto.getNotes())
                .sku(productDto.getSku())
                .weight(productDto.getWeight())
                .dimensions(productDto.getDimensions())
                .status(productDto.getStatus())
                .categories(productDto.getCategories())
                .images(productDto.getImages())
                .stockLevels(productDto.getStockLevels())
                .build();
    }
}
