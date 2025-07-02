package com.example.backend.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "STATUS")
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Boolean active;

    // Konstruktor bezargumentowy wymagany przez JPA
    protected Status() {}

    // Konstruktor z polem active
    public Status(Boolean active) {
        this.active = active;
    }

    // Getter'y

    public Long getId() {
        return id;
    }

    public Boolean getActive() {
        return active;
    }
}
