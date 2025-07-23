package com.example.backend.services.impl;

import com.example.backend.dto.ImageDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.Image;
import com.example.backend.entity.Product;
import com.example.backend.mapper.ImageMapper;
import com.example.backend.repository.DataRepository;
import com.example.backend.repository.ImageRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.services.ImageService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;
    private final DataRepository dataRepository;
    private final ImageMapper imageMapper;

    @Value("${uploads.directory}")
    private String uploadDir;

    @Override
    public ImageDto addImage(ImageDto imageDto) {
        Product product = productRepository.findById( (long) imageDto.getProductId());
        Image imageEntity = ImageMapper.toEntity(imageDto, product);
        Image savedImage = imageRepository.save(imageEntity);
        return ImageMapper.toDto(savedImage);
    }

    @Override
    public ImageDto updateImage(Long id, ImageDto imageDto){
        Image image = imageRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono obrazka o podanym ID"));

        image.setAlt(imageDto.getAlt());
        image.setPath(imageDto.getPath());
        image.setSize(imageDto.getSize());
        Data data = dataRepository.findById((long) imageDto.getData().getId());
        data.setUpdatedAt(imageDto.getData().getUpdatedAt());
        image.setData(data);

        Image updated = imageRepository.save(image);
        return ImageMapper.toDto(updated);
    }

    @Override
    public List<ImageDto> getImagesByProductId(Long productId){
        Product product = productRepository.findById(productId).orElseThrow(()->new RuntimeException("Nie znaleziono produktu o podanym ID"));
        return imageMapper.toDtoList(imageRepository.findByProduct(product));
    }

    @Override
    public String deleteImage(Long id) {
        try {
            Image image = imageRepository.findById(id)
                    .orElse(null);

            if (image == null) {
                return "Nie znaleziono obrazka o podanym ID";
            }

            // File path on disk
            Path filePath = Paths.get(uploadDir, Paths.get(image.getPath()).getFileName().toString());

            // Delete file if exists
            Files.deleteIfExists(filePath);

            imageRepository.deleteById(id);

            return "Pomyślnie usunięto zdjęcie";
        } catch (IOException e) {
            return "Błąd przy usuwaniu pliku: " + e.getMessage();
        } catch (Exception e) {
            return "Błąd: " + e.getMessage();
        }
    }

    @Override
    public List<String> uploadFiles(MultipartFile[] files, Long productId) {
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

                addImage(imageDto);

                savedFiles.add("/uploads/" + uniqueName);

            } catch (IOException e) {
                throw new RuntimeException("Błąd przy zapisie pliku: " + e.getMessage());
            }
        }

        return savedFiles;
    }



    @Override
    public ImageDto getImageById(Long id) {
        Image image = imageRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono obrazka o podanym ID"));
        return ImageMapper.toDto(image);
    }
}
