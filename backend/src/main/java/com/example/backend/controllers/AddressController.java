package com.example.backend.controllers;

import com.example.backend.dto.AddressDto;
import com.example.backend.services.impl.AddressServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/address")
public class AddressController {

    private final AddressServiceImpl addressServiceImpl;

    @PostMapping("/add")
    public AddressDto addAddress(@RequestBody AddressDto addressDto){
        return addressServiceImpl.addAddress(addressDto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAddress(@PathVariable Long id){
        if(addressServiceImpl.deleteAddress(id)){
            return "Pomyślnie usunięto adres";
        }else{
            return "Nieudana próba usunięcia adresu";
        }
    }

}
