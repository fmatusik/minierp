package com.example.backend.controllers;

import com.example.backend.dto.CategoryDto;
import com.example.backend.mapper.CategoryMapper;
import com.example.backend.services.CategoryService;
import lombok.AllArgsConstructor;
import org.hibernate.CallbackException;
import org.hibernate.annotations.NaturalId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @PostMapping("/add")
    public CategoryDto addCategory(@RequestBody CategoryDto categoryDto){
        return categoryService.addCategory(categoryDto);
    }

    @GetMapping("/all")
    public List<CategoryDto> getAllCategories(){
        return categoryService.findAllDto();
    }

    @GetMapping("/one/{id}")
    public CategoryDto getCategoryById(@PathVariable Long id){
        return categoryService.getDtoById(id);
    }

    @PutMapping("/update/color/{id}")
    public CategoryDto updateCategoryColor(@PathVariable Long id, @RequestBody String color) {
        return categoryService.updateCategoryColor(id, color);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCategory(@PathVariable Long id){
        return categoryService.deleteCategory(id);
    }

}
