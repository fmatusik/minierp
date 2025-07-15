package com.example.backend.services;

import com.example.backend.dto.ImageDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ImageService {
    ImageDto addImage(ImageDto imageDto);
}
