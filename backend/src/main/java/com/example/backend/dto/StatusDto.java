package com.example.backend.dto;

import com.example.backend.entity.Data;
import com.example.backend.enums.StatusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class StatusDto {
    private Long id;
    private String name;
    private StatusType type;
    private String color;
    private Data data;
}
