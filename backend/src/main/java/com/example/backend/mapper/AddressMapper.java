package com.example.backend.mapper;

import com.example.backend.dto.AddressDto;
import com.example.backend.entity.Address;

import java.util.List;
import java.util.stream.Collectors;

public class AddressMapper {

    public static Address toEntity(AddressDto dto) {
        return Address.builder()
                .id(dto.getId())
                .buildingNumber(dto.getBuildingNumber())
                .apartmentNumber(dto.getApartmentNumber())
                .postalCode(dto.getPostalCode())
                .city(dto.getCity())
                .province(dto.getProvince())
                .clientContact(dto.getClientContact() != null ? ClientContactMapper.toEntity(dto.getClientContact()) : null)
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
                .clientContact(entity.getClientContact() != null ? ClientContactMapper.toDto(entity.getClientContact()) : null)
                .data(entity.getData())
                .build();
    }

    public static List<Address> toEntityList(List<AddressDto> dtoList) {
        return dtoList.stream()
                .map(AddressMapper::toEntity)
                .collect(Collectors.toList());
    }

    public static List<AddressDto> toDtoList(List<Address> entityList) {
        return entityList.stream()
                .map(AddressMapper::toDto)
                .collect(Collectors.toList());
    }
}
