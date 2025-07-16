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


    @Value("${uploads.directory}")
    private String uploadDir;

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
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {
        try {
            // Pobierz dane obrazka z bazy
            ImageDto imageDto = imageService.getImageById(id);
            if (imageDto == null) {
                return ResponseEntity.notFound().build();
            }

            // Ścieżka do pliku na dysku
            Path filePath = Paths.get(uploadDir, Paths.get(imageDto.getPath()).getFileName().toString());

            // Usuń plik, jeśli istnieje
            Files.deleteIfExists(filePath);

            // Usuń rekord z bazy
            imageService.deleteImage(id);

            return ResponseEntity.ok("Obraz został usunięty.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Błąd przy usuwaniu pliku: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Błąd: " + e.getMessage());
        }
    }


    @PostMapping("/upload/files")
    public ResponseEntity<?> handleFileUpload(@RequestParam("images") MultipartFile[] files, @RequestParam("productId") Long productId)
    {
        List<String> savedFiles = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                String originalFilename = file.getOriginalFilename();
                String uniqueName = UUID.randomUUID() + "_" + originalFilename;

                Path path = Paths.get(uploadDir, uniqueName);
                Files.createDirectories(path.getParent());
                Files.write(path, file.getBytes());

                ImageDto imageDto = ImageDto.builder()
                        .path("/uploads/" + uniqueName)
                        .alt(uniqueName)
                        .size(file.getSize())
                        .productId(productId)
                        .build();

                imageService.addImage(imageDto);  // Save metadata in DB

                savedFiles.add("/uploads/" + uniqueName);

            } catch (IOException e) {
                return ResponseEntity.status(500).body("Błąd przy zapisie pliku.");
            }
        }

        return ResponseEntity.ok(savedFiles);
    }

}
