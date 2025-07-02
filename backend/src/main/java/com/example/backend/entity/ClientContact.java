package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "client_contact")
public class ClientContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstname;

    @Column(nullable = false)
    private String lastname;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phonenumber;

    @Column(nullable = false)
    private String position;

    @Column(nullable = true)
    private Long addressId;

    // Konstruktor bezargumentowy wymagany przez JPA
    protected ClientContact() {}

    // Konstruktor z wymaganymi polami
    public ClientContact(String firstname, String lastname, String email,
                         String phonenumber, String position, Long addressId) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phonenumber = phonenumber;
        this.position = position;
        this.addressId = addressId;
    }

    // Getter'y

    public Long getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getEmail() {
        return email;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public String getPosition() {
        return position;
    }

    public Long getAddressId() {
        return addressId;
    }
}
