package com.example.backend.repository;

import com.example.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Date;

@RepositoryRestResource
public interface CategoryRepository extends JpaRepository<Category, Long> {
    //podaje swoje argumenty zamiast tworzyc samych zapytan
    //Category findByNameAndProvinceOrCreatedAt(String name, String Province, Date createdAt);

    Category findById(long id);
}
