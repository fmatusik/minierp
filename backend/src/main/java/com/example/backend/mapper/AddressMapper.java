package com.example.backend.mapper;

import com.example.backend.dto.AddressDto;
import com.example.backend.entity.Address;

public class AddressMapper {

    public static Address toEntity(AddressDto dto) {
        return Address.builder()
                .id(dto.getId())
                .buildingNumber(dto.getBuildingNumber())
                .apartmentNumber(dto.getApartmentNumber())
                .postalCode(dto.getPostalCode())
                .city(dto.getCity())
                .province(dto.getProvince())
                .clientContact(dto.getClientContact())
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
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .clientContact(entity.getClientContact())
                .build();
    }
}
