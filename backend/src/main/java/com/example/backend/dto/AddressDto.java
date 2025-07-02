package com.example.backend.dto;

import com.example.backend.entity.ClientContact;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

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
