package com.example.backend.services.impl;

import com.example.backend.dto.ClientContactDto;
import com.example.backend.entity.ClientContact;
import com.example.backend.mapper.ClientContactMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.ClientContactRepository;
import com.example.backend.services.ClientContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientContactServiceImpl implements ClientContactService {

    private final ClientContactRepository clientContactRepository;

    @Autowired
    public ClientContactServiceImpl(AddressRepository addressRepository, ClientContactRepository clientContactRepository) {
        this.clientContactRepository = clientContactRepository;
    }

    @Override
    public ClientContactDto addClientContact(ClientContactDto clientContactDto) {
        ClientContact clientContactEntity = ClientContactMapper.toEntity(clientContactDto);
        ClientContact savedClientContact = clientContactRepository.save(clientContactEntity);
        return ClientContactMapper.toDto(savedClientContact);
    }
}
