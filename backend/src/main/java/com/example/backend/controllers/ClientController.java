package com.example.backend.controllers;

import com.example.backend.dto.ClientDto;
import com.example.backend.mapper.ClientMapper;
import com.example.backend.repository.ClientRepository;
import com.example.backend.services.ClientService;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    private final ClientService clientService;
    private final ClientMapper clientMapper;
    private final ClientRepository clientRepository;


    public ClientController(ClientService clientService, ClientMapper clientMapper, ClientRepository clientRepository) {
        this.clientService = clientService;
        this.clientMapper = clientMapper;
        this.clientRepository = clientRepository;
    }

    @GetMapping("/all")
    public List<ClientDto> getAllClients() {
        return clientMapper.toDtoList(clientRepository.findAll());
    }

    @PostMapping("/add")
    public ClientDto addClient(@RequestBody ClientDto clientDto) {
        return clientMapper.toDto(clientRepository.save(clientMapper.toEntity(clientDto)));
    }




}
