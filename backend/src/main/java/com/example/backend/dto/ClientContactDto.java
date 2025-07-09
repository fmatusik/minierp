package com.example.backend.dto;

import com.example.backend.entity.Address;
import com.example.backend.entity.Client;
import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@AllArgsConstructor
@Getter
public class ClientContactDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String position;
    private Data data;
    private ClientDto clientDto;

}
