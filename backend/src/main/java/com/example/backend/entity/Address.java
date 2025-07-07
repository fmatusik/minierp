package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

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

    @Column(nullable = false, name = "\"apartmentNumber\"")
    private String apartmentNumber;

    @Column(nullable = false, name = "\"postalCode\"")
    private String postalCode;

    @Column(nullable = false, name = "city")
    private String city;

    @Column(nullable = false, name = "province")
    private String province;


    @ManyToOne
    @JoinColumn(name = "\"clientContact\"", nullable = false)
    private ClientContact clientContact;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;



}
