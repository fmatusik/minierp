package com.example.backend.services.impl;

import com.example.backend.dto.ClientDto;
import com.example.backend.entity.Client;
import com.example.backend.entity.Data;
import com.example.backend.mapper.ClientMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.ClientRepository;
import com.example.backend.services.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private final ClientRepository clientRepository;

    @Override
    public ClientDto addClient(ClientDto clientDto) {
        Client clientEnity = ClientMapper.toEntity(clientDto);
        clientEnity.setData(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                .build());
        Client savedClient = clientRepository.save(clientEnity);
        return ClientMapper.toDto(savedClient);
    }
}
