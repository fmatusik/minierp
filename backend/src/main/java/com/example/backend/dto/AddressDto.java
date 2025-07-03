package com.example.backend.dto;

import com.example.backend.entity.ClientContact;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class AddressDto {
    private Long id;
    private String buildingNumber;
    private String apartmentNumber;
    private String postalCode;
    private String city;
    private String province;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private ClientContact clientContact;
}
