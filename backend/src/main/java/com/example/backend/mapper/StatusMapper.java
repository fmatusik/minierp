package com.example.backend.mapper;

import com.example.backend.dto.StatusDto;
import com.example.backend.entity.Status;

public class StatusMapper {

    public static StatusDto toDto(Status status){
        return StatusDto.builder()
                .id(status.getId())
                .active(status.getActive())
                .data(status.getData())
                .build();
    }

    public static Status toEntity(StatusDto statusDto) {
        return Status.builder()
                .id(statusDto.getId())
                .active(statusDto.getActive())
                .data(statusDto.getData())
                .build();
    }
}
