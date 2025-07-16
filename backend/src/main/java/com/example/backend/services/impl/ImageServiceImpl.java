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
    private final DataRepository dataRepository;
    private final ImageMapper imageMapper;


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
    public String deleteImage(Long id){
        if(imageRepository.existsById(id)){
            imageRepository.deleteById(id);
            return "Pomyślnie usunięto zdjęcie";
        }else{
            return "Nie znaleziono obrazka o podanym ID";
        }
    }

    @Override
    public ImageDto getImageById(Long id) {
        Image image = imageRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono obrazka o podanym ID"));
        return ImageMapper.toDto(image);
    }
}
