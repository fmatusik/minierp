package com.example.backend.dto;

import com.example.backend.entity.ClientContact;
import com.example.backend.entity.Data;
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

    private Data data;

    private String notes;

    private List<ClientContactDto> clientContact;

}
