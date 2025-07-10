package com.example.backend.mapper;

import com.example.backend.dto.ClientContactDto;
import com.example.backend.entity.Client;
import com.example.backend.entity.ClientContact;

import java.util.List;
import java.util.stream.Collectors;

public class ClientContactMapper {

    public static ClientContactDto toDto(ClientContact clientContact) {
        return ClientContactDto.builder()
                .id(clientContact.getId())
                .firstName(clientContact.getFirstName())
                .lastName(clientContact.getLastName())
                .email(clientContact.getEmail())
                .phoneNumber(clientContact.getPhoneNumber())
                .position(clientContact.getPosition())
                .clientId(clientContact.getClient() != null ? clientContact.getClient().getId() : null)
                .data(clientContact.getData())
                .build();
    }

    public static ClientContact toEntity(ClientContactDto clientContactDto, Client client) {

        return ClientContact.builder()
                .id(clientContactDto.getId())
                .firstName(clientContactDto.getFirstName())
                .lastName(clientContactDto.getLastName())
                .email(clientContactDto.getEmail())
                .phoneNumber(clientContactDto.getPhoneNumber())
                .position(clientContactDto.getPosition())
                .client(client)
                .data(clientContactDto.getData())
                .build();
    }

    public static List<ClientContactDto> toDtoList(List<ClientContact> entityList) {
        return entityList.stream()
                .map(ClientContactMapper::toDto)
                .collect(Collectors.toList());
    }

}
