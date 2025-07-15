package com.example.backend.dto;

import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class ProductFindDto{
    private Long id;
    private String name;
    private Float price;
    private Data data;
    private String description;
    private String notes;
    private String sku;
    private Float weight;
    private Float dimensions;
    private StatusDto statusDto;
    private CategoryDto categoryDto;
    private List<ImageDto> imagesDto;
    private List<StockLevelDto> stockLevelsDto;
}
