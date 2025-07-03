package com.example.backend.services.impl;

import com.example.backend.dto.ClientDto;
import com.example.backend.entity.Client;
import com.example.backend.mapper.ClientMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.ClientRepository;
import com.example.backend.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientServiceImpl(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public ClientDto addClient(ClientDto clientDto) {
        Client clientEnity = ClientMapper.toEntity(clientDto);
        Client savedClient = clientRepository.save(clientEnity);
        return ClientMapper.toDto(savedClient);
    }
}
