package com.example.backend.services.impl;

import com.example.backend.dto.ClientContactDto;
import com.example.backend.entity.Client;
import com.example.backend.entity.ClientContact;
import com.example.backend.entity.Data;
import com.example.backend.mapper.ClientContactMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.ClientContactRepository;
import com.example.backend.repository.ClientRepository;
import com.example.backend.services.ClientContactService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class ClientContactServiceImpl implements ClientContactService {

    @Autowired
    private final ClientContactRepository clientContactRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private final ClientContactMapper clientContactMapper;

    @Override
    public ClientContactDto addClientContact(ClientContactDto clientContactDto) {
        Client client = clientRepository.findById((long) clientContactDto.getClientId());
        ClientContact clientContactEntity = ClientContactMapper.toEntity(clientContactDto, client);
        clientContactEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build());
        ClientContact savedClientContact = clientContactRepository.save(clientContactEntity);
        return ClientContactMapper.toDto(savedClientContact);
    }

    @Override
    public Boolean deleteClientContact(Long id) {
        try {
            if (!clientContactRepository.existsById(id)) {
                return false;
            }
            clientContactRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public ClientContactDto updateClientContact(ClientContactDto updatedContactDto) {
        var existing = clientContactRepository.findById(updatedContactDto.getId())
                .orElseThrow(() -> new RuntimeException("Kontakt nie istnieje"));

        existing.setFirstName(updatedContactDto.getFirstName());
        existing.setLastName(updatedContactDto.getLastName());
        existing.setEmail(updatedContactDto.getEmail());
        existing.setPhoneNumber(updatedContactDto.getPhoneNumber());
        existing.setPosition(updatedContactDto.getPosition());

        clientContactRepository.save(existing);
        return clientContactMapper.toDto(existing);
    }

}
