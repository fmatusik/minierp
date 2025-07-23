package com.example.backend.controllers;

import com.example.backend.dto.ClientDto;
import com.example.backend.mapper.ClientMapper;
import com.example.backend.repository.ClientRepository;
import com.example.backend.services.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/client")
public class ClientController {

    private final ClientService clientService;
    private final ClientMapper clientMapper;
    private final ClientRepository clientRepository;


    @GetMapping("/all")
    public List<ClientDto> getAllClients() {
        return clientService.findAllDto();
    }

    @GetMapping("/one/{id}")
    public ClientDto getClientById(@PathVariable Long id) {
        return clientMapper.toDto(clientRepository.findById(id).get());
    }



    @PostMapping("/add")
    public ClientDto addClient(@RequestBody ClientDto clientDto) {
        return clientService.addClient(clientDto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteClient(@PathVariable Long id){

        return clientService.deleteClient(id);
    }




}
