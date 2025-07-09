package com.example.backend;

import com.example.backend.dto.ClientContactDto;
import com.example.backend.dto.ClientDto;
import com.example.backend.entity.Data;
import com.example.backend.services.ClientContactService;
import org.junit.jupiter.api.AutoClose;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
public class ClientContactServiceTest {

    @Autowired
    ClientContactService clientContactService;


    @Test
    void addClientContact(){

       ClientContactDto clientContactDto = ClientContactDto.builder()
                .firstName("Filip")
                .lastName("Karl")
                .email("email@email.com")
                .phoneNumber("123456789")
                .position("staff member")
                .data(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build())
               .clientDto(ClientDto.builder()
                       .id(0L)  // assuming the client ID is Long
                       .build())
                .build();

       clientContactService.addClientContact(clientContactDto);


    }

}
