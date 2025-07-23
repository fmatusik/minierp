package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import io.micrometer.common.lang.Nullable;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"ADDRESS\"")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name="\"buildingNumber\"")
    private String buildingNumber;

    @Column(name = "\"apartmentNumber\"")
    private String apartmentNumber;

    @Column(nullable = false, name = "\"postalCode\"")
    private String postalCode;

    @Column(nullable = false, name = "city")
    private String city;

    @Column(nullable = false, name = "province")
    private String province;

    @Column(nullable = false, name="street")
    private String street;

    @Nullable
    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "client", nullable = true)
    @JsonBackReference
    private Client client;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;



}
