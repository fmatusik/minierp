package com.example.backend.services;

import com.example.backend.dto.AddressDto;
import com.example.backend.entity.Address;
import org.springframework.stereotype.Service;

@Service
public interface AddressService {

    AddressDto addAddress(AddressDto  addressDto);

}
