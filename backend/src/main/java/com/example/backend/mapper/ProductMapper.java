package com.example.backend.mapper;

import com.example.backend.dto.ProductDto;
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
                .description(product.getDescription())
                .status(product.getStatus() != null ? StatusMapper.toDto(product.getStatus()) : null)
                .categories(product.getCategories() != null
                        ? CategoryMapper.toDtoList(product.getCategories())
                        : null)
                .images(product.getImages() != null
                        ? ImageMapper.toDtoList(product.getImages())
                        : null)
                .stockLevels(product.getStockLevels() != null
                        ? StockLevelMapper.toDtoList(product.getStockLevels())
                        : null)
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
                        ? CategoryMapper.toEntityList(productDto.getCategories())
                        : null)
                .images(productDto.getImages() != null
                        ? ImageMapper.toEntityList(productDto.getImages())
                        : null)
                .stockLevels(productDto.getStockLevels() != null
                        ? StockLevelMapper.toEntityList(productDto.getStockLevels())
                        : null)
                .build();
    }

    public static List<ProductDto> toDtoList(List<Product> entityList) {
        return entityList.stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<Product> toEntityList(List<ProductDto> dtoList) {
        return dtoList.stream()
                .map(ProductMapper::toEntity)
                .collect(Collectors.toList());
    }
}
