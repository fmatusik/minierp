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
                .clientDto(clientContact.getClient() != null ? ClientMapper.toDto(clientContact.getClient()) : null)
                .data(clientContact.getData())
                .build();
    }

    public static ClientContact toEntity(ClientContactDto clientContactDto) {
        return ClientContact.builder()
                .id(clientContactDto.getId())
                .firstName(clientContactDto.getFirstName())
                .lastName(clientContactDto.getLastName())
                .email(clientContactDto.getEmail())
                .phoneNumber(clientContactDto.getPhoneNumber())
                .position(clientContactDto.getPosition())
                .client(clientContactDto.getClientDto() != null ? ClientMapper.toEntity(clientContactDto.getClientDto()) : null)
                .data(clientContactDto.getData())
                .build();
    }

    public static List<ClientContactDto> toDtoList(List<ClientContact> entityList) {
        return entityList.stream()
                .map(ClientContactMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<ClientContact> toEntityList(List<ClientContactDto> dtoList) {
        return dtoList.stream()
                .map(ClientContactMapper::toEntity)
                .collect(Collectors.toList());
    }
}
