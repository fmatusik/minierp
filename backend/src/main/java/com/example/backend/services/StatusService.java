package com.example.backend.services;

import com.example.backend.dto.StatusDto;
import com.example.backend.enums.StatusType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StatusService {
    StatusDto addStatus(StatusDto statusDto);
    List<StatusDto> findAllDto();
    StatusDto updateStatus(StatusDto statusDto);
    String deleteStatus(Long id);
    List <StatusDto> findAllProductStatusesDto();
    List <StatusDto> findAllOrderStatusesDto();
}
