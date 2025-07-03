package com.example.backend.services;

import com.example.backend.dto.AddressDto;
import org.springframework.stereotype.Service;

@Service
public interface AddressService {
    //wszystkie metody jak add update/change, delete albo get/select
    //jak nie ma gotowca to w repo tworze własne rzeczy
    AddressDto addAddress(AddressDto  addressDto);



}
