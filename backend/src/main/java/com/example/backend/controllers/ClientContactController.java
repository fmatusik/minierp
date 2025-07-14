package com.example.backend.controllers;


import com.example.backend.dto.ClientContactDto;
import com.example.backend.services.ClientContactService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/clientContact")
public class ClientContactController {


    private final ClientContactService clientContactService;


    @PostMapping("/add")
    public ClientContactDto addClientContact(@RequestBody ClientContactDto clientContactDto) {
        return clientContactService.addClientContact(clientContactDto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteClientContact(@PathVariable Long id){
        if(clientContactService.deleteClientContact(id)){
            return "Pomyślnie usunięto kontakt";
        }else{
            return "Wystąpił nieoczekiwany błąd";
        }
    }

    @PutMapping("/update/{id}")
    public ClientContactDto updateClientContact(@RequestBody ClientContactDto updatedContactDto) {
        return clientContactService.updateClientContact(updatedContactDto);
    }


}
