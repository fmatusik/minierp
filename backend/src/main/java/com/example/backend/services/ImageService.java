package com.example.backend.services;

import com.example.backend.dto.ImageDto;
import org.springframework.stereotype.Service;

@Service
public interface ImageService {
    ImageDto addImage(ImageDto imageDto);
}
