package com.example.backend.mapper;

import com.example.backend.dto.ProductAddDto;
import com.example.backend.dto.ProductFindDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Product;
import com.example.backend.entity.Status;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public static ProductAddDto toDto(Product product) {
        return ProductAddDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .data(product.getData())
                .description(product.getDescription())
                .dimensions(product.getDimensions())
                .notes(product.getNotes())
                .sku(product.getSku())
                .weight(product.getWeight())
                .statusId(product.getStatus() != null ? StatusMapper.toDto(product.getStatus()).getId() : null)
                .categoryId(product.getCategory() != null ? CategoryMapper.toDtoWithoutProduct(product.getCategory()).getId() : null)
                .imagesDto(product.getImages() != null
                        ? ImageMapper.toDtoList(product.getImages())
                        : null)
                .stockLevelsDto(product.getStockLevels() != null
                        ? StockLevelMapper.toDtoList(product.getStockLevels())
                        : null)
                .build();
    }

    public static Product toEntity(ProductAddDto productAddDto, Category category, Status status) {
        return Product.builder()
                .id(productAddDto.getId())
                .name(productAddDto.getName())
                .price(productAddDto.getPrice())
                .data(productAddDto.getData())
                .description(productAddDto.getDescription())
                .notes(productAddDto.getNotes())
                .sku(productAddDto.getSku())
                .weight(productAddDto.getWeight())
                .dimensions(productAddDto.getDimensions())
                .status(status)
                .category(category)
                .images(productAddDto.getImagesDto() != null
                        ? ImageMapper.toEntityList(productAddDto.getImagesDto())
                        : null)
                .stockLevels(productAddDto.getStockLevelsDto() != null
                        ? StockLevelMapper.toEntityList(productAddDto.getStockLevelsDto())
                        : null)
                .build();
    }

    public static List<ProductAddDto> toDtoList(List<Product> entityList) {
        return entityList.stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<Product> toEntityList(List<ProductAddDto> dtoList, Category category, Status status) {
        return dtoList.stream()
                .map(dto -> toEntity(dto, category, status))
                .collect(Collectors.toList());
    }

    public static Product toEntityWithoutCategoryAndStatus(ProductFindDto productFindDto) {
        return Product.builder()
                .id(productFindDto.getId())
                .name(productFindDto.getName())
                .price(productFindDto.getPrice())
                .data(productFindDto.getData())
                .description(productFindDto.getDescription())
                .notes(productFindDto.getNotes())
                .sku(productFindDto.getSku())
                .weight(productFindDto.getWeight())
                .dimensions(productFindDto.getDimensions())
                .images(productFindDto.getImagesDto() != null
                        ? ImageMapper.toEntityList(productFindDto.getImagesDto())
                        : null)
                .stockLevels(productFindDto.getStockLevelsDto() != null
                        ? StockLevelMapper.toEntityList(productFindDto.getStockLevelsDto())
                        : null)
                .category(null) // Avoids circular reference
                .build();
    }

    public static List<Product> toEntityListWithoutCategory(List<ProductFindDto> dtoList) {
        return dtoList.stream()
                .map(ProductMapper::toEntityWithoutCategoryAndStatus)
                .collect(Collectors.toList());
    }


    public static ProductFindDto toFindDto(Product product) {
        return ProductFindDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .data(product.getData())
                .description(product.getDescription())
                .dimensions(product.getDimensions())
                .notes(product.getNotes())
                .sku(product.getSku())
                .weight(product.getWeight())
                .statusDto(product.getStatus() != null ? StatusMapper.toDto(product.getStatus()) : null)
                .categoryDto(product.getCategory() != null ? CategoryMapper.toDtoWithoutProduct(product.getCategory()) : null)
                .imagesDto(product.getImages() != null
                        ? ImageMapper.toDtoList(product.getImages())
                        : null)
                .stockLevelsDto(product.getStockLevels() != null
                        ? StockLevelMapper.toDtoList(product.getStockLevels())
                        : null)
                .orderItemDtos(product.getOrderItems() != null ? OrderItemMapper.toDtoList(product.getOrderItems()) : null)
                .build();
    }

    public static List<ProductFindDto> toDtoFindList(List<Product> entityList) {
        return entityList.stream()
                .map(ProductMapper::toFindDto)
                .collect(Collectors.toList());
    }


    public static ProductFindDto toFindDtoWithoutCategory(Product product) {
        return ProductFindDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .data(product.getData())
                .description(product.getDescription())
                .notes(product.getNotes())
                .sku(product.getSku())
                .weight(product.getWeight())
                .statusDto(product.getStatus() != null ? StatusMapper.toDto(product.getStatus()) : null)
                .imagesDto(product.getImages() != null
                        ? ImageMapper.toDtoList(product.getImages())
                        : null)
                .stockLevelsDto(product.getStockLevels() != null
                        ? StockLevelMapper.toDtoList(product.getStockLevels())
                        : null)
                .orderItemDtos(product.getOrderItems() != null ? OrderItemMapper.toDtoList(product.getOrderItems()) : null)
                .build();
    }

    public static List<ProductFindDto> toDtoFindListWithoutCategory(List<Product> entityList) {
        return entityList.stream()
                .map(ProductMapper::toFindDtoWithoutCategory)
                .collect(Collectors.toList());
    }


}
