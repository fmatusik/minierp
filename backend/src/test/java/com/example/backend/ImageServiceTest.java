package com.example.backend;

import com.example.backend.dto.ImageDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.Image;
import com.example.backend.entity.Product;
import com.example.backend.mapper.ImageMapper;
import com.example.backend.repository.ImageRepository;
import com.example.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
public class ImageServiceTest {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;

    @Test
    void addImage() {
        Product product = productRepository.findById(1L); // make sure product with id=1 exists or handle null

        ImageDto imageDto = ImageDto.builder()
                .path("path")
                .alt("alt")
                .size(100L)
                .productId(product.getId())
                .data(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now()).build())
                .build();

        Image image = imageRepository.save(ImageMapper.toEntity(imageDto, product));
    }
}
