package com.example.backend.mapper;

import com.example.backend.dto.ClientContactDto;
import com.example.backend.entity.ClientContact;

public class ClientContactMapper {

    public static ClientContactDto toDto(ClientContact clientContact) {
        return ClientContactDto.builder()
                .id(clientContact.getId())
                .firstName(clientContact.getFirstname())
                .lastName(clientContact.getLastname())
                .email(clientContact.getEmail())
                .phoneNumber(clientContact.getPhoneNumber())
                .position(clientContact.getPosition())
                .addresses(clientContact.getAddresses())
                .client(clientContact.getClient())
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
                .addresses(clientContactDto.getAddresses())
                .client(clientContactDto.getClient())
                .build();
    }
}
