package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "warehouse")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address_id", nullable = false)
    private Long addressId;

    @Column(nullable = false)
    private String type; // Można później zamienić na Enum

    @Column(nullable = false)
    private Long capacity;

    // Konstruktor bezargumentowy wymagany przez JPA
    protected Warehouse() {}

    // Konstruktor użytkowy
    public Warehouse(Long addressId, String type, Long capacity) {
        this.addressId = addressId;
        this.type = type;
        this.capacity = capacity;
    }

    // Gettery

    public Long getId() {
        return id;
    }

    public Long getAddressId() {
        return addressId;
    }

    public String getType() {
        return type;
    }

    public Long getCapacity() {
        return capacity;
    }
}
