package com.example.backend.dto;

import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class StatusDto {
    private Long id;
    private String name;
    private Data data;
}
