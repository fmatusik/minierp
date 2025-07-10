package com.example.backend;

import com.example.backend.dto.AddressDto;
import com.example.backend.entity.Address;
import com.example.backend.entity.Client;
import com.example.backend.entity.ClientContact;
import com.example.backend.entity.Data;
import com.example.backend.mapper.AddressMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.ClientRepository;
import com.example.backend.services.AddressService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AddressServiceTest {

    @Autowired
    private AddressService addressService;

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private AddressRepository addressRepository;

    @Test
    void addAddress() {


        AddressDto addressDto = AddressDto.builder()
                .buildingNumber("12")
                .apartmentNumber("18")
                .postalCode("12345")
                .city("London")
                .province("Małopolska")
                .street("Opolska")
                .clientId(2L)
                .data(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build())
                .build();

        Client client = clientRepository.findById( (long) addressDto.getClientId());



        Address address = addressRepository.save(AddressMapper.toEntity(addressDto, client));


        //return address
    }

    @Test
    void deleteAddress() {
        addressRepository.deleteById(4L);
    }
}
