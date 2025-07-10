package com.example.backend.mapper;

import com.example.backend.dto.CategoryDto;
import com.example.backend.dto.ProductDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
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
                .statusDto(product.getStatus() != null ? StatusMapper.toDto(product.getStatus()) : null)
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .imagesDto(product.getImages() != null
                        ? ImageMapper.toDtoList(product.getImages())
                        : null)
                .stockLevelsDto(product.getStockLevels() != null
                        ? StockLevelMapper.toDtoList(product.getStockLevels())
                        : null)
                .build();
    }

    public static Product toEntity(ProductDto productDto, Category category) {
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
                .status(productDto.getStatusDto() != null ? StatusMapper.toEntity(productDto.getStatusDto()) : null)
                .category(category)
                .images(productDto.getImagesDto() != null
                        ? ImageMapper.toEntityList(productDto.getImagesDto())
                        : null)
                .stockLevels(productDto.getStockLevelsDto() != null
                        ? StockLevelMapper.toEntityList(productDto.getStockLevelsDto())
                        : null)
                .build();
    }

    public static List<ProductDto> toDtoList(List<Product> entityList) {
        return entityList.stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<Product> toEntityList(List<ProductDto> dtoList, Category category) {
        return dtoList.stream()
                .map(dto -> toEntity(dto, category))
                .collect(Collectors.toList());
    }

    public static Product toEntityWithoutCategory(ProductDto productDto) {
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
                .status(productDto.getStatusDto() != null ? StatusMapper.toEntity(productDto.getStatusDto()) : null)
                .images(productDto.getImagesDto() != null
                        ? ImageMapper.toEntityList(productDto.getImagesDto())
                        : null)
                .stockLevels(productDto.getStockLevelsDto() != null
                        ? StockLevelMapper.toEntityList(productDto.getStockLevelsDto())
                        : null)
                .category(null) // Avoids circular reference
                .build();
    }

    public static List<Product> toEntityListWithoutCategory(List<ProductDto> dtoList) {
        return dtoList.stream()
                .map(ProductMapper::toEntityWithoutCategory)
                .collect(Collectors.toList());
    }
}
