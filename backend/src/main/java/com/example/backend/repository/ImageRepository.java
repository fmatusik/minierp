package com.example.backend.repository;

import com.example.backend.entity.Image;
import com.example.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findAllByProductId(long id);

    List<Image> findByProduct(Product product);

    Image findById(long id);

    void deleteAllByProductId(Long id);
}
