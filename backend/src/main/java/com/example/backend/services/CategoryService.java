package com.example.backend.services;

import com.example.backend.dto.CategoryDto;
import org.springframework.stereotype.Service;

@Service
public interface CategoryService {

    CategoryDto addCategory(CategoryDto  categoryDto);
}
