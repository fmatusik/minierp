package com.example.backend.services.impl;

import com.example.backend.dto.ImageDto;
import com.example.backend.entity.Image;
import com.example.backend.mapper.ImageMapper;
import com.example.backend.repository.ImageRepository;
import com.example.backend.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public ImageDto addImage(ImageDto imageDto) {
        Image imageEntity = ImageMapper.toEntity(imageDto);
        Image savedImage = imageRepository.save(imageEntity);
        return ImageMapper.toDto(savedImage);
    }
}
