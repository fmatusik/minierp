package com.example.backend.services;

import com.example.backend.dto.ImageDto;
import com.example.backend.entity.Image;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ImageService {
    ImageDto addImage(ImageDto imageDto);
    ImageDto updateImage(Long id, ImageDto imageDto);
    List<ImageDto> getImagesByProductId(Long productId);
    String deleteImage(Long id);
    ImageDto getImageById(Long id);
}
