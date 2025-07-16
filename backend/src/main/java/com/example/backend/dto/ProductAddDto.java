package com.example.backend.dto;

import com.example.backend.entity.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class ProductAddDto {
    private Long id;
    private String name;
    private double price;
    private Data data;
    private String description;
    private String notes;
    private String sku;
    private Float weight;
    private String dimensions;
    private Long statusId;
    private Long categoryId;
    private List<ImageDto> imagesDto;
    private List<StockLevelDto> stockLevelsDto;
}

