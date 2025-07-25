package com.example.backend.services;

import com.example.backend.dto.ClientDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClientService {
    ClientDto addClient(ClientDto clientDto);
    List<ClientDto> findAllDto();
    String deleteClient(Long id);
    List <ClientDto> findLastFive(Long productId);
}
