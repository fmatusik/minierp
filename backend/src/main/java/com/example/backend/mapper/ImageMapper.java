package com.example.backend.mapper;

import com.example.backend.dto.ImageDto;
import com.example.backend.entity.Image;

public class ImageMapper {

    public static ImageDto toDto(Image image) {
        return ImageDto.builder()
                .id(image.getId())
                .path(image.getPath())
                .alt(image.getAlt())
                .size(image.getSize())
                .isThumbnail(image.getIsThumbnail())
                .product(image.getProduct() != null ? ProductMapper.toDto(image.getProduct()) : null)
                .data(image.getData())
                .build();
    }


    public static Image toEntity(ImageDto imageDto) {
        return Image.builder()
                .id(imageDto.getId())
                .path(imageDto.getPath())
                .alt(imageDto.getAlt())
                .size(imageDto.getSize())
                .isThumbnail(imageDto.getIsThumbnail())
                .product(imageDto.getProduct()  != null ? ProductMapper.toEntity(imageDto.getProduct()) : null)
                .data(imageDto.getData())
                .build();
    }
}
