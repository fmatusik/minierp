package com.example.backend.controllers;

import com.example.backend.dto.ImageDto;
import com.example.backend.entity.Image;
import com.example.backend.services.ImageService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;


    @PostMapping("/add")
    public ImageDto addImage(ImageDto imageDto) {
        return imageService.addImage(imageDto);
    }

    @GetMapping("/product/{productId}")
    public List<ImageDto> getImagesByProductId(@PathVariable Long productId) {
        return imageService.getImagesByProductId(productId);
    }

    @PutMapping("/update/{id}")
    public ImageDto updateImage(@PathVariable Long id, @RequestBody ImageDto imageDto) {
        return imageService.updateImage(id, imageDto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteImage(@PathVariable Long id) {
        return imageService.deleteImage(id);
    }


    @PostMapping("/upload/files")
    public ResponseEntity<?> handleFileUpload(@RequestParam("images") MultipartFile[] files, @RequestParam("productId") Long productId) {
        try {
            List<String> savedFiles = imageService.uploadFiles(files, productId);
            return ResponseEntity.ok(savedFiles);
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }


}
