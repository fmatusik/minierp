package com.example.backend.mapper;

import com.example.backend.dto.StatusDto;
import com.example.backend.entity.Status;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class StatusMapper {

    public static StatusDto toDto(Status status) {
        return StatusDto.builder()
                .id(status.getId())
                .name(status.getName())
                .type(status.getType())
                .color(status.getColor())
                .data(status.getData())
                .build();
    }

    public static Status toEntity(StatusDto statusDto) {
        return Status.builder()
                .id(statusDto.getId())
                .name(statusDto.getName())
                .type(statusDto.getType())
                .color(statusDto.getColor())
                .data(statusDto.getData())
                .build();
    }

    public static List<StatusDto> toDtoList(List<Status> entityList) {
        return entityList.stream()
                .map(StatusMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<Status> toEntityList(List<StatusDto> dtoList) {
        return dtoList.stream()
                .map(StatusMapper::toEntity)
                .collect(Collectors.toList());
    }
}
