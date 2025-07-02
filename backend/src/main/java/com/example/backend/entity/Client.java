package com.example.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    private String notes;

    @Column(nullable = false)
    private Long statusId;

    @Column(nullable = false)
    private Long clientContactId;

    // Konstruktor bezargumentowy wymagany przez JPA
    protected Client() {}

    // Konstruktor z wymaganymi polami (bez id, timestamps)
    public Client(String name, String notes, Long statusId, Long clientContactId) {
        this.name = name;
        this.notes = notes;
        this.statusId = statusId;
        this.clientContactId = clientContactId;
    }

    // Getter'y

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getNotes() {
        return notes;
    }

    public Long getStatusId() {
        return statusId;
    }

    public Long getClientContactId() {
        return clientContactId;
    }
}
