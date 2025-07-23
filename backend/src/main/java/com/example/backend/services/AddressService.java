package com.example.backend.services;

import com.example.backend.dto.AddressDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AddressService {
    //wszystkie metody jak add update/change, delete albo get/select
    //tutaj takie rzeczy z logiką a takie proste zapytania w stylu findById wrzucać do Repository
    //bardziej chodzi ze nie tu logika ale w impl (ale no wiadomo)
    //jak nie ma gotowca to w repo tworze własne rzeczy
    AddressDto addAddress(AddressDto  addressDto);
    String deleteAddress(Long id);
    List<AddressDto> findByClientId(Long clientId);
    AddressDto updateAddress(AddressDto addressDto);
    AddressDto addWarehouseAddress(AddressDto addressDto);




}
