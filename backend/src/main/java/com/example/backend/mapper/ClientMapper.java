package com.example.backend.mapper;

import com.example.backend.dto.AddressDto;
import com.example.backend.dto.ClientDto;
import com.example.backend.entity.Client;

public class ClientMapper {


    public static ClientDto toDto(Client client) {
        return ClientDto.builder()
                .id(client.getId())
                .name(client.getName())
                .createdAt(client.getCreatedAt())
                .updatedAt(client.getUpdatedAt())
                .notes(client.getNotes())
                .status(client.getStatus())
                .clientContact(client.getClientContacts())
                .build();
    }

    public static Client toEntity(ClientDto clientDto) {
        return Client.builder()
                .id(clientDto.getId())
                .name(clientDto.getName())
                .createdAt(clientDto.getCreatedAt())
                .updatedAt(clientDto.getUpdatedAt())
                .notes(clientDto.getNotes())
                .status(clientDto.getStatus())
                .clientContacts(clientDto.getClientContact())
                .build();
    }
}
