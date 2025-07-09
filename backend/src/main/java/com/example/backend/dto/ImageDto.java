package com.example.backend.dto;

import com.example.backend.entity.Data;
import com.example.backend.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class ImageDto {
    private Long id;
    private String path;
    private String alt;
    private Long size;
    private Boolean isThumbnail;
    private ProductDto productDto;
    private Data data;
}
