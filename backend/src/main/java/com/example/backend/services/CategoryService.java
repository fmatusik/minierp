package com.example.backend.services;

import com.example.backend.dto.CategoryDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {

    CategoryDto addCategory(CategoryDto  categoryDto);
    List<CategoryDto> findAllDto();
    CategoryDto getDtoById(Long id);
}
