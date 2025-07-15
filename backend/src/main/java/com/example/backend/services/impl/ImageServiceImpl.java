package com.example.backend.services.impl;

import com.example.backend.dto.ImageDto;
import com.example.backend.entity.Image;
import com.example.backend.entity.Product;
import com.example.backend.mapper.ImageMapper;
import com.example.backend.repository.ImageRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.services.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;



    @Override
    public ImageDto addImage(ImageDto imageDto) {
        Product product = productRepository.findById( (long) imageDto.getProductId());
        Image imageEntity = ImageMapper.toEntity(imageDto, product);
        Image savedImage = imageRepository.save(imageEntity);
        return ImageMapper.toDto(savedImage);
    }
}
