package com.example.backend.repository;

import com.example.backend.entity.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface DataRepository extends JpaRepository<Data, Integer> {
    Data findById(Long id);
}
