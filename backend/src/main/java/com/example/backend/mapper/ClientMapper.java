package com.example.backend.mapper;

import com.example.backend.dto.AddressDto;
import com.example.backend.dto.ClientDto;
import com.example.backend.entity.Client;

import java.util.stream.Collectors;

public class ClientMapper {


    public static ClientDto toDto(Client client) {
        return ClientDto.builder()
                .id(client.getId())
                .name(client.getName())
                .data(client.getData())
                .notes(client.getNotes())
                .status(client.getStatus())
                .clientContact(client.getClientContacts() != null
                            ? client.getClientContacts().stream()
                        .map(ClientContactMapper::toDto)
                        .collect(Collectors.toList()) : null
                )
                .build();
    }

    public static Client toEntity(ClientDto clientDto) {
        return Client.builder()
                .id(clientDto.getId())
                .name(clientDto.getName())
                .data(clientDto.getData())
                .notes(clientDto.getNotes())
                .status(clientDto.getStatus())
                .clientContacts(clientDto.getClientContact() != null
                        ? clientDto.getClientContact().stream()
                                .map(ClientContactMapper::toEntity)
                                .collect(Collectors.toList()) : null
                        )
                .build();
    }
}
