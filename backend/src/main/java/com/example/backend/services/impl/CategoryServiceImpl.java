package com.example.backend.services.impl;

import com.example.backend.dto.CategoryDto;
import com.example.backend.entity.Category;
import com.example.backend.entity.Data;
import com.example.backend.mapper.CategoryMapper;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDto addCategory(CategoryDto categoryDto) {
        Category categoryEntity = CategoryMapper.toEntity(categoryDto);
        categoryEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now()).build()
        );
        categoryEntity = categoryRepository.save(categoryEntity);
        return CategoryMapper.toDto(categoryEntity);
    }

    @Override
    public List<CategoryDto> findAllDto(){
        return CategoryMapper.toDtoList(categoryRepository.findAll());
    }

    @Override
    public CategoryDto getDtoById(Long id){
        return CategoryMapper.toDto(categoryRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono kategorii o id: "+id)));
    }

    public CategoryDto updateCategoryColor(Long id, String color) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kategoria nie znaleziona o ID: " + id));

        category.setColor(color);
        Category updated = categoryRepository.save(category);
        return categoryMapper.toDto(updated);
    }

    @Override
    public String deleteCategory(Long id) {
        try {
            Category category = categoryRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono kategorii o id: "+id));
            category.getProducts().forEach(product -> product.setCategory(null));
            categoryRepository.deleteById(id);
            return "Pomyślnie usunięto kategorię";
        } catch (EmptyResultDataAccessException e) {
            return "Nie znaleziono kategorii o podanym ID";
        } catch (Exception e) {
            return "Wystąpił nieoczekiwany problem";
        }
    }

}
