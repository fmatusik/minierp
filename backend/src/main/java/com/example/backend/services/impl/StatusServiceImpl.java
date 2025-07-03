package com.example.backend.services.impl;

import com.example.backend.dto.StatusDto;
import com.example.backend.entity.Status;
import com.example.backend.mapper.StatusMapper;
import com.example.backend.repository.StatusRepository;
import com.example.backend.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;

    @Autowired
    public StatusServiceImpl(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }


    @Override
    public StatusDto addStatus(StatusDto statusDto) {
        Status statusEntity = StatusMapper.toEntity(statusDto);
        statusEntity = statusRepository.save(statusEntity);
        return StatusMapper.toDto(statusEntity);
    }
}
