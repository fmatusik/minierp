package com.example.backend.services.impl;

import com.example.backend.dto.ClientDto;
import com.example.backend.entity.Client;
import com.example.backend.entity.Data;
import com.example.backend.mapper.ClientMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.ClientContactRepository;
import com.example.backend.repository.ClientRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.services.ClientService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private ClientMapper clientMapper;
    private final AddressRepository addressRepository;
    private final OrderRepository orderRepository;
    private final ClientContactRepository clientContactRepository;

    @Override
    public ClientDto addClient(ClientDto clientDto) {
        Client clientEnity = ClientMapper.toEntity(clientDto);
        clientEnity.setData(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                .build());
        Client savedClient = clientRepository.save(clientEnity);
        return ClientMapper.toDto(savedClient);
    }

    @Override
    public List<ClientDto> findAllDto(){
        return  clientMapper.toDtoList(clientRepository.findAll());
    }

    @Transactional
    public Boolean deleteClient(Long id){
        try {
            if (!clientRepository.existsById(id)) {
                return false;
            }

            Client client = clientRepository.findById(id).orElseThrow();
            orderRepository.deleteAll(client.getOrders());
            addressRepository.deleteAll(client.getAddresses());
            clientContactRepository.deleteAll(client.getClientContacts());

            clientRepository.delete(client);
            return true;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<ClientDto> findLastFive(Long productId) {
        return List.of();
    }

}
