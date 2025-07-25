package com.example.backend.dto;

import com.example.backend.entity.Data;
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
    private Long productId;
    private Data data;
}
