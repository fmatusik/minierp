package com.example.backend.repository;

import com.example.backend.dto.StatusDto;
import com.example.backend.entity.Status;
import com.example.backend.enums.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface StatusRepository extends JpaRepository<Status, Long> {

    List<StatusDto> findAllByType(StatusType type);

    Status findById(long id);
}
