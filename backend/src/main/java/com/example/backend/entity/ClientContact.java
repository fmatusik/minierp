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

    @Column(nullable = false, name = "\"firstName\"")
    private String firstName;

    @Column(nullable = false, name = "\"lastName\"")
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, name = "\"phoneNumber\"")
    private String phoneNumber;

    @Column(nullable = false)
    private String position;


    @OneToMany(mappedBy = "clientContact", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;

    @ManyToOne
    @JoinColumn(name = "client", nullable = false)
    private Client client;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;


}
