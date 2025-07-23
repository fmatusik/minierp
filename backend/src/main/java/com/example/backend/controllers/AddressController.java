package com.example.backend.controllers;

import com.example.backend.dto.AddressDto;
import com.example.backend.services.AddressService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/address")
public class AddressController {

    private final AddressService addressService;

    @PostMapping("/add")
    public AddressDto addAddress(@RequestBody AddressDto addressDto){
        return addressService.addAddress(addressDto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAddress(@PathVariable Long id){
        return addressService.deleteAddress(id);
    }

    @GetMapping("/one/{clientId}")
    public List<AddressDto> getAddressByClientId(@PathVariable Long clientId){
        return addressService.findByClientId(clientId);
    }

    @PutMapping("/update/{id}")
    public AddressDto updateAddress(@RequestBody AddressDto addressDto){
        return addressService.updateAddress(addressDto);
    }

    @PostMapping("/add/warehouse")
    public AddressDto addAddressToWarehouse(@RequestBody AddressDto addressDto){
        return addressService.addWarehouseAddress(addressDto);
    }

}
