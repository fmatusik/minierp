package com.example.backend.dto;

import com.example.backend.entity.Data;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class ClientDto {
    private Long id;
    private String name;
    private Data data;
    private String notes;
    private List<ClientContactDto> clientContactsDto;
    private List<AddressDto> addressesDto;
}
