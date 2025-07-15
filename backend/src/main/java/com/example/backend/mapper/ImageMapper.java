package com.example.backend.mapper;

import com.example.backend.dto.ImageDto;
import com.example.backend.entity.Image;
import com.example.backend.entity.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ImageMapper {

    public static ImageDto toDto(Image image) {
        return ImageDto.builder()
                .id(image.getId())
                .path(image.getPath())
                .alt(image.getAlt())
                .size(image.getSize())
                .isThumbnail(image.getIsThumbnail())
                .productId(image.getProduct() != null ? image.getProduct().getId() : null)
                .data(image.getData())
                .build();
    }

    public static Image toEntity(ImageDto imageDto, Product product) {
        return Image.builder()
                .id(imageDto.getId())
                .path(imageDto.getPath())
                .alt(imageDto.getAlt())
                .size(imageDto.getSize())
                .isThumbnail(imageDto.getIsThumbnail())
                .product(product)
                .data(imageDto.getData())
                .build();
    }

    public static List<ImageDto> toDtoList(List<Image> entityList) {
        return entityList.stream()
                .map(ImageMapper::toDto)
                .collect(Collectors.toList());
    }


    public static Image toEntityWithoutProduct(ImageDto imageDto) {
        return Image.builder()
                .id(imageDto.getId())
                .path(imageDto.getPath())
                .alt(imageDto.getAlt())
                .size(imageDto.getSize())
                .isThumbnail(imageDto.getIsThumbnail())
                .data(imageDto.getData())
                .build();
    }

    public static List<Image> toEntityList(List<ImageDto> dtoList) {
        return dtoList.stream()
                .map(ImageMapper::toEntityWithoutProduct)
                .collect(Collectors.toList());
    }
}
