package com.example.backend.services;

import com.example.backend.dto.StatusDto;
import org.springframework.stereotype.Service;

@Service
public interface StatusService {
    StatusDto addStatus(StatusDto statusDto);
}
