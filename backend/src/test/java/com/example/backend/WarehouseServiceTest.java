package com.example.backend;

import com.example.backend.dto.AddressDto;
import com.example.backend.dto.WarehouseAddDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.Warehouse;
import com.example.backend.enums.WarehouseType;
import com.example.backend.mapper.WarehouseMapper;
import com.example.backend.repository.WarehouseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
public class WarehouseServiceTest {


    @Autowired
    private WarehouseRepository warehouseRepository;

    @Test
    void addWarehouse() {

/*        WarehouseAddDto warehouseAddDto = WarehouseAddDto.builder()
                .addressDto(AddressDto.builder()
                        .buildingNumber("18A")
                        .apartmentNumber("1")
                        .postalCode("31-215")
                        .city("Kraków")
                        .province("Małopolska")
                        .street("Opolska")
                        .data(Data.builder()
                                .createdAt(LocalDateTime.now())
                                .updatedAt(LocalDateTime.now())
                                .build())
                .build())
                .type(WarehouseType.CENTRAL)
                .capacity(2000.00)
                .data(Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build())
                .build();

        Warehouse warehouse =*/// warehouseRepository.save(WarehouseMapper.toEntity(warehouseAddDto));

        //return warehouse
    }

}
