package com.example.backend.services.impl;

import com.example.backend.dto.AddressDto;
import com.example.backend.entity.Address;
import com.example.backend.mapper.AddressMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public AddressDto addAddress(AddressDto addressDto) {
        Address addressEntity = AddressMapper.toEntity(addressDto);
        Address savedAddress = addressRepository.save(addressEntity);
        return AddressMapper.toDto(savedAddress);
    }
}
