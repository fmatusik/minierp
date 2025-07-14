package com.example.backend.controllers;


import com.example.backend.dto.ClientContactDto;
import com.example.backend.mapper.ClientContactMapper;
import com.example.backend.repository.ClientContactRepository;
import com.example.backend.services.ClientContactService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/clientContact")
public class ClientContactController {


    private final ClientContactService clientContactService;


    @PostMapping("/add")
    public ClientContactDto addClientContact(@RequestBody ClientContactDto clientContactDto) {
        return clientContactService.addClientContact(clientContactDto);
    }

}
