package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"CLIENT_CONTACT\"")
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


    @OneToMany(mappedBy = "clientContact", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;


}
