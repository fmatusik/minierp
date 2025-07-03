package com.example.backend.mapper;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Product;

import java.util.stream.Collectors;

public class ProductMapper {

    public static ProductDto toDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .data(product.getData())
                .description(product.getDescription())
                .notes(product.getNotes())
                .sku(product.getSku())
                .weight(product.getWeight())
                .description(product.getDescription())
                .status(product.getStatus() != null ? StatusMapper.toDto(product.getStatus()) : null)
                .categories(product.getCategories() != null
                            ? product.getCategories().stream()
                                .map(CategoryMapper::toDto)
                                .collect(Collectors.toList())
                        : null
                        )
                .images(product.getImages() != null
                        ? product.getImages().stream()
                                .map(ImageMapper::toDto)
                                .collect(Collectors.toList())
                        : null
                        )
                .stockLevels(product.getStockLevels() != null ? product.getStockLevels().stream()
                        .map(StockLevelMapper::toDto)
                        .collect(Collectors.toList()) : null)
                .build();
    }

    public static Product toEntity(ProductDto productDto) {
        return Product.builder()
                .id(productDto.getId())
                .name(productDto.getName())
                .price(productDto.getPrice())
                .data(productDto.getData())
                .description(productDto.getDescription())
                .notes(productDto.getNotes())
                .sku(productDto.getSku())
                .weight(productDto.getWeight())
                .dimensions(productDto.getDimensions())
                .status(productDto.getStatus() != null ? StatusMapper.toEntity(productDto.getStatus()) : null)
                .categories(productDto.getCategories() != null
                    ? productDto.getCategories().stream()
                        .map(CategoryMapper::toEntity)
                        .collect(Collectors.toList())
                        :null )
                .images(productDto.getImages() != null ? productDto.getImages().stream()
                        .map(ImageMapper::toEntity)
                        .collect(Collectors.toList())
                        : null)
                .stockLevels(productDto.getStockLevels() != null ? productDto.getStockLevels().stream()
                                .map(StockLevelMapper::toEntity)
                                .collect(Collectors.toList()) : null
                        )
                .build();
    }
}
