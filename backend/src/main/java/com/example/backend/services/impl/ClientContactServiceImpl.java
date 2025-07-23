package com.example.backend.services.impl;

import com.example.backend.dto.ClientContactDto;
import com.example.backend.entity.Client;
import com.example.backend.entity.ClientContact;
import com.example.backend.entity.Data;
import com.example.backend.mapper.ClientContactMapper;
import com.example.backend.repository.ClientContactRepository;
import com.example.backend.repository.ClientRepository;
import com.example.backend.repository.DataRepository;
import com.example.backend.services.ClientContactService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@AllArgsConstructor
@Service
public class ClientContactServiceImpl implements ClientContactService {

    private final ClientContactRepository clientContactRepository;
    private ClientRepository clientRepository;
    private final ClientContactMapper clientContactMapper;
    private DataRepository dataRepository;

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
    public String deleteClientContact(Long id) {
        try {
            if (!clientContactRepository.existsById(id)) {
                return "Nie odnaleziono kontaktu o podanym ID";
            }
            clientContactRepository.deleteById(id);
            return "Pomyślnie usunięto kontakt";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ClientContactDto updateClientContact(ClientContactDto updatedContactDto) {
        ClientContact existing = clientContactRepository.findById(updatedContactDto.getId())
                .orElseThrow(() -> new RuntimeException("Kontakt nie istnieje"));

        existing.setFirstName(updatedContactDto.getFirstName());
        existing.setLastName(updatedContactDto.getLastName());
        existing.setEmail(updatedContactDto.getEmail());
        existing.setPhoneNumber(updatedContactDto.getPhoneNumber());
        existing.setPosition(updatedContactDto.getPosition());
        Data data = dataRepository.findById(updatedContactDto.getData().getId());
        data.setUpdatedAt(LocalDateTime.now());
        existing.setData(data);
        clientContactRepository.save(existing);
        return clientContactMapper.toDto(existing);
    }

}
