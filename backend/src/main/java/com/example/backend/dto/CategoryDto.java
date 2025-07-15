package com.example.backend.dto;

import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

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

    private List<ProductAddDto> productsDto;


}
