package com.example.backend.mapper;

import com.example.backend.dto.ClientDto;
import com.example.backend.entity.Client;

import java.util.List;
import java.util.stream.Collectors;

public class ClientMapper {

    public static ClientDto toDto(Client client) {
        return ClientDto.builder()
                .id(client.getId())
                .name(client.getName())
                .data(client.getData())
                .notes(client.getNotes())
                .clientContact(client.getClientContacts() != null
                        ? ClientContactMapper.toDtoList(client.getClientContacts()) : null)
                .build();
    }

    public static Client toEntity(ClientDto clientDto) {
        return Client.builder()
                .id(clientDto.getId())
                .name(clientDto.getName())
                .data(clientDto.getData())
                .notes(clientDto.getNotes())
                .clientContacts(clientDto.getClientContact() != null
                        ? ClientContactMapper.toEntityList(clientDto.getClientContact())
                        : null)
                .build();
    }

    public static List<ClientDto> toDtoList(List<Client> entityList) {
        return entityList.stream()
                .map(ClientMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<Client> toEntityList(List<ClientDto> dtoList) {
        return dtoList.stream()
                .map(ClientMapper::toEntity)
                .collect(Collectors.toList());
    }
}
