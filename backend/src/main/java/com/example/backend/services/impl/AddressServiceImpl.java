package com.example.backend.services.impl;

import com.example.backend.dto.AddressDto;
import com.example.backend.entity.Address;
import com.example.backend.entity.Client;
import com.example.backend.entity.Data;
import com.example.backend.mapper.AddressMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.ClientRepository;
import com.example.backend.services.AddressService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
@Component
public class AddressServiceImpl implements AddressService {
    @Autowired
    private final AddressRepository addressRepository;
    @Autowired
    private final ClientRepository clientRepository;

    //basically convert z dto na entity i potem dodanie do bazy
    //return dto
    @Override
    public AddressDto addAddress(AddressDto addressDto) {
        System.out.println(addressDto.getClientId());
        Client client = clientRepository.findById((long) addressDto.getClientId());
        Address addressEntity = AddressMapper.toEntity(addressDto, client);
        addressEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build());
        Address savedAddress = addressRepository.save(addressEntity);
        return AddressMapper.toDto(savedAddress);
    }

    @Override
    public Boolean deleteAddress(Long id) {
        try {
            if (!addressRepository.existsById(id)) {
                return false;
            }
            addressRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<AddressDto> findByClientId(Long clientId){
        Client client = clientRepository.findById( (long) clientId);
        return AddressMapper.toDtoList(addressRepository.findByClient(client));

    }

}
