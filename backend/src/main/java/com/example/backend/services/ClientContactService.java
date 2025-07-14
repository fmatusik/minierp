package com.example.backend.services;

import com.example.backend.dto.ClientContactDto;
import org.springframework.stereotype.Service;

@Service
public interface ClientContactService {
    ClientContactDto addClientContact(ClientContactDto clientContactDto);
    Boolean deleteClientContact(Long id);
    ClientContactDto updateClientContact(ClientContactDto clientContactDto);
}
