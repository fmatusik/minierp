package com.example.backend.dto;

import com.example.backend.entity.Category;
import com.example.backend.entity.Image;
import com.example.backend.entity.Status;
import com.example.backend.entity.StockLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private Float price;
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private String description;
    private String notes;
    private String sku;
    private Float weight;
    private Float dimensions;
    private Status status;
    private List<Category> categories;
    private List<Image> images;
    private List<StockLevel> stockLevels;
}
