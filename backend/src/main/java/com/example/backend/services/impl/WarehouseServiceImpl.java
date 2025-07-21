package com.example.backend.services.impl;

import com.example.backend.dto.WarehouseAddDto;
import com.example.backend.dto.WarehouseFindDto;
import com.example.backend.entity.Address;
import com.example.backend.entity.Data;
import com.example.backend.entity.Warehouse;
import com.example.backend.mapper.WarehouseMapper;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.WarehouseRepository;
import com.example.backend.services.WarehouseService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class WarehouseServiceImpl implements WarehouseService {

    private final WarehouseRepository warehouseRepository;
    private final AddressRepository addressRepository;
    private final WarehouseMapper warehouseMapper;

    @Override
    public WarehouseAddDto addWarehouse(WarehouseAddDto warehouseAddDto) {
        Address addressEntity = addressRepository.findById((long) warehouseAddDto.getAddressId());
        Warehouse warehouseEntity = WarehouseMapper.toEntity(warehouseAddDto, addressEntity );
        warehouseEntity.setData(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                .build());
        Warehouse warehouseSaved = warehouseRepository.save(warehouseEntity);
        return WarehouseMapper.toDto(warehouseSaved);
    }

    @Override
    public WarehouseFindDto findWarehouseById(Long id) {
        return warehouseMapper.toFindDto(warehouseRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono magazynu o podanym ID")));
    }

    @Override
    public List<WarehouseFindDto> findAllDto() {
        return WarehouseMapper.toDtoFindList(warehouseRepository.findAll());
    }

    @Override
    public String deleteWarehouse(Long id) {
        if(warehouseRepository.existsById(id)){
            warehouseRepository.deleteById(id);
            return "Pomyślnie usunięto magazyn";
        }else{
            return "Nie odnaleziono danego magazynu";
        }
    }

    @Override
    public WarehouseFindDto updateWarehouseById(WarehouseAddDto warehouseAddDto, Long id) {
        var existing = warehouseRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono magazynu o podanym ID"));
        existing.setName(warehouseAddDto.getName());
        existing.setCapacity(warehouseAddDto.getCapacity());
        existing.setType(warehouseAddDto.getType());
        Data data = existing.getData();
        data.setUpdatedAt(LocalDateTime.now());
        existing.setData(data);

        warehouseRepository.save(existing);
        return WarehouseMapper.toFindDto(existing);
    }
}
