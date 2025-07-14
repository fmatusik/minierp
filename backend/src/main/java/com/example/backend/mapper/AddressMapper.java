package com.example.backend.mapper;

import com.example.backend.dto.AddressDto;
import com.example.backend.entity.Address;
import com.example.backend.entity.Client;

import java.util.List;
import java.util.stream.Collectors;

public class AddressMapper {

    public static Address toEntity(AddressDto dto, Client client) {
        return Address.builder()
                .id(dto.getId())
                .buildingNumber(dto.getBuildingNumber())
                .apartmentNumber(dto.getApartmentNumber())
                .postalCode(dto.getPostalCode())
                .city(dto.getCity())
                .province(dto.getProvince())
                .street(dto.getStreet())
                .client(client)
                .data(dto.getData())
                .build();
    }

    public static Address toEntityWithoutClient(AddressDto dto) {
        return Address.builder()
                .id(dto.getId())
                .buildingNumber(dto.getBuildingNumber())
                .apartmentNumber(dto.getApartmentNumber())
                .postalCode(dto.getPostalCode())
                .city(dto.getCity())
                .province(dto.getProvince())
                .street(dto.getStreet())
                // brak ustawiania klienta
                .data(dto.getData())
                .build();
    }

    public static AddressDto toDto(Address entity) {
        return AddressDto.builder()
                .id(entity.getId())
                .buildingNumber(entity.getBuildingNumber())
                .apartmentNumber(entity.getApartmentNumber())
                .postalCode(entity.getPostalCode())
                .city(entity.getCity())
                .province(entity.getProvince())
                .street(entity.getStreet())
                .clientId(entity.getClient() != null ? ClientMapper.toDtoWithoutContactsAndAddresses(entity.getClient()).getId() : null)
                .data(entity.getData())
                .build();
    }

    public static AddressDto toDtoWithoutClient(Address entity) {
        return AddressDto.builder()
                .id(entity.getId())
                .buildingNumber(entity.getBuildingNumber())
                .apartmentNumber(entity.getApartmentNumber())
                .postalCode(entity.getPostalCode())
                .city(entity.getCity())
                .province(entity.getProvince())
                .street(entity.getStreet())
                // brak ustawiania clientId
                .data(entity.getData())
                .build();
    }

    public static List<AddressDto> toDtoList(List<Address> entityList) {
        return entityList.stream()
                .map(AddressMapper::toDto)
                .collect(Collectors.toList());
    }
}
