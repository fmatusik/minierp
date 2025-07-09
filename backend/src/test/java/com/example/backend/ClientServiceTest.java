package com.example.backend;

import com.example.backend.dto.AddressDto;
import com.example.backend.dto.ClientContactDto;
import com.example.backend.dto.ClientDto;
import com.example.backend.entity.Data;
import com.example.backend.services.ClientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
public class ClientServiceTest {

    @Autowired
    ClientService clientService;

    @Test
    void testAddClient() {
        ClientDto clientDto = ClientDto.builder()
                .name("Andrew")
                .data(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build())
                .notes("test")
                .addressesDto(List.of(
                        AddressDto.builder()
                                .buildingNumber("12A")
                                .apartmentNumber("5")
                                .postalCode("00-123")
                                .city("Warsaw")
                                .province("Mazowieckie")
                                .street("Main Street")
                                .data(Data.builder()
                                        .createdAt(LocalDateTime.now())
                                        .updatedAt(LocalDateTime.now())
                                        .build())
                                .build(),
                        AddressDto.builder()
                                .buildingNumber("34B")
                                .apartmentNumber("10")
                                .postalCode("01-456")
                                .city("Krakow")
                                .province("Malopolskie")
                                .street("Second Street")
                                .data(Data.builder()
                                        .createdAt(LocalDateTime.now())
                                        .updatedAt(LocalDateTime.now())
                                        .build())
                                .build()
                ))
                .build();

        clientService.addClient(clientDto);
    }
}
