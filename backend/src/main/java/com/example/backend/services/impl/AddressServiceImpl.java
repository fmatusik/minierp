package com.example.backend.services.impl;

import com.example.backend.dto.AddressDto;
import com.example.backend.entity.Address;
import com.example.backend.entity.Client;
import com.example.backend.entity.Data;
import com.example.backend.mapper.AddressMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.ClientRepository;
import com.example.backend.repository.DataRepository;
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
    @Autowired
    private DataRepository dataRepository;

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

    @Override
    public AddressDto updateAddress(AddressDto addressDto) {
        var existingAddress = addressRepository.findById((long) addressDto.getId());

        existingAddress.setBuildingNumber(addressDto.getBuildingNumber());
        existingAddress.setApartmentNumber(addressDto.getApartmentNumber());
        existingAddress.setPostalCode(addressDto.getPostalCode());
        existingAddress.setCity(addressDto.getCity());
        existingAddress.setProvince(addressDto.getProvince());
        existingAddress.setStreet(addressDto.getStreet());

        Data data = dataRepository.findById((long) addressDto.getData().getId());
        data.setUpdatedAt(LocalDateTime.now());
        existingAddress.setData(data);
        addressRepository.save(existingAddress);
        return AddressMapper.toDto(existingAddress);
    }

    @Override
    public AddressDto addWarehouseAddress(AddressDto addressDto) {
        Address addressEntity = AddressMapper.toEntityWithoutClient(addressDto);
        addressEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build());
        Address savedAddress = addressRepository.save(addressEntity);
        return AddressMapper.toDto(savedAddress);
    }


}
