package com.example.backend.dto;

import com.example.backend.entity.ClientContact;
import com.example.backend.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class ClientDto {

    private Long id;

    private String name;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String notes;

    private Status status;

    private List<ClientContact> clientContact;

}
