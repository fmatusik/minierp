package com.example.backend;

import com.example.backend.dto.AddressDto;
import com.example.backend.entity.ClientContact;
import com.example.backend.services.AddressService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AddressServiceTest {

    @Autowired
    private AddressService addressService;

    @Test
    void shouldAddAddress() {
        ClientContact contact = new ClientContact();
        contact.setId(1L);

        /*AddressDto dto = new AddressDto(
                null,
                "12A",
                "5",
                "00-123",
                "Warsaw",
                "Mazowieckie",
                null,
                null,
                contact
        );

        AddressDto saved = addressService.addAddress(dto);

        assertNotNull(saved.getId());
        assertEquals("Warsaw", saved.getCity());
        assertEquals("Mazowieckie", saved.getProvince());
        assertNotNull(saved.getCreatedAt());*/
    }
}
