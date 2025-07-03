package com.example.backend.mapper;

import com.example.backend.dto.ClientContactDto;
import com.example.backend.entity.ClientContact;
import java.util.stream.Collectors;

public class ClientContactMapper {

    public static ClientContactDto toDto(ClientContact clientContact) {
        return ClientContactDto.builder()
                .id(clientContact.getId())
                .firstName(clientContact.getFirstname())
                .lastName(clientContact.getLastname())
                .email(clientContact.getEmail())
                .phoneNumber(clientContact.getPhoneNumber())
                .position(clientContact.getPosition())
                .addresses(clientContact.getAddresses() != null
                        ? clientContact.getAddresses().stream()
                        .map(AddressMapper::toDto)
                        .collect(Collectors.toList())
                        : null)
                .client(clientContact.getClient() != null
                        ? ClientMapper.toDto(clientContact.getClient()) : null)
                .data(clientContact.getData())
                .build();
    }

    public static ClientContact toEntity(ClientContactDto clientContactDto) {
        return ClientContact.builder()
                .id(clientContactDto.getId())
                .firstname(clientContactDto.getFirstName())
                .lastname(clientContactDto.getLastName())
                .email(clientContactDto.getEmail())
                .phoneNumber(clientContactDto.getPhoneNumber())
                .position(clientContactDto.getPosition())
                .addresses(clientContactDto.getAddresses() != null
                        ? clientContactDto.getAddresses().stream()
                        .map(AddressMapper::toEntity)
                        .collect(Collectors.toList())
                        : null)
                .client(clientContactDto.getClient() != null ?  ClientMapper.toEntity(clientContactDto.getClient()) : null)
                .data(clientContactDto.getData())
                .build();
    }
}
