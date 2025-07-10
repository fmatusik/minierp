package com.example.backend;

import com.example.backend.dto.ClientContactDto;
import com.example.backend.dto.ClientDto;
import com.example.backend.entity.Client;
import com.example.backend.entity.ClientContact;
import com.example.backend.entity.Data;
import com.example.backend.mapper.ClientContactMapper;
import com.example.backend.repository.ClientContactRepository;
import com.example.backend.repository.ClientRepository;
import com.example.backend.services.ClientContactService;
import org.junit.jupiter.api.AutoClose;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;

@SpringBootTest
public class ClientContactServiceTest {

    @Autowired
    ClientContactService clientContactService;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ClientContactRepository clientContactRepository;


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
               .clientId(1L)
                .build();


        //clientContactDto.clientI
        Client client = clientRepository.findById( (long) clientContactDto.getClientId());


        ClientContact clientContact = clientContactRepository.save(
                ClientContactMapper.toEntity(clientContactDto, client)
        );


        //na koncu return ClientContactMapper.toDto(clientContact);



    }

}
