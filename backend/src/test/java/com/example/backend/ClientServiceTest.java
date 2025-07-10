package com.example.backend;

import com.example.backend.dto.AddressDto;
import com.example.backend.dto.ClientContactDto;
import com.example.backend.dto.ClientDto;
import com.example.backend.entity.Address;
import com.example.backend.entity.Client;
import com.example.backend.entity.Data;
import com.example.backend.repository.ClientRepository;
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

    @Autowired
    ClientRepository clientRepository;



    @Test
    void testAddClient() {
        Data clientData = Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Client client = Client.builder()
                .name("Andrew")
                .data(clientData)
                .notes("test")
                .build();

        Address address1 = Address.builder()
                .buildingNumber("122")
                .apartmentNumber("5")
                .postalCode("00-123")
                .city("Warsaw")
                .province("Mazowieckie2")
                .street("Main Street")
                .data(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build())
                .client(client)
                .build();

        Address address2 = Address.builder()
                .buildingNumber("342")
                .apartmentNumber("10")
                .postalCode("01-456")
                .city("Krakow")
                .province("Malopolskie")
                .street("Second Street")
                .data(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build())
                .client(client)
                .build();

        client.setAddresses(List.of(address1, address2));

        clientRepository.save(client);
    }

    @Test
    void deleteClient() {

        clientRepository.deleteById(1L);
    }

}
