package com.example.backend.dto;

import com.example.backend.entity.Category;
import com.example.backend.entity.Data;
import com.example.backend.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class CategoryDto {

    private Long id;

    private String name;

    private String color;

    private Data data;

    private int productCount;

    private List<ProductDto> productsDto;


}
