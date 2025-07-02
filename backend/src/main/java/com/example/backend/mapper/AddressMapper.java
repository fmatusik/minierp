package com.example.backend.mapper;

import com.example.backend.dto.AddressDto;
import com.example.backend.entity.Address;

public class AddressMapper {

    public static Address toEntity(AddressDto dto) {
        Address address = new Address();
        address.setId(dto.getId());
        address.setBuildingNumber(dto.getBuildingNumber());
        address.setApartmentNumber(dto.getApartmentNumber());
        address.setPostalCode(dto.getPostalCode());
        address.setCity(dto.getCity());
        address.setProvince(dto.getProvince());
        address.setClientContact(dto.getClientContact());  // Upewnij się, że klient istnieje!
        return address;
    }

    public static AddressDto toDto(Address entity) {
        return new AddressDto(
                entity.getId(),
                entity.getBuildingNumber(),
                entity.getApartmentNumber(),
                entity.getPostalCode(),
                entity.getCity(),
                entity.getProvince(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                entity.getClientContact()
        );
    }
}
