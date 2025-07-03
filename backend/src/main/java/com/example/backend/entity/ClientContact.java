package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
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
    private String phoneNumber;

    @Column(nullable = false)
    private String position; //moze enum, dopytac !!!


    @OneToMany(mappedBy = "clientContact", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;


}
