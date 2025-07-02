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
@Table(name = "\"WAREHOUSE\"")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address")
    private Address address;

    @Column(nullable = false)
    private String type; // Można później zamienić na Enum

    @Column(nullable = false)
    private Long capacity;


    @OneToMany(mappedBy = "sourceWarehouse")
    private List<StockMovement> sourceMovements;

    @OneToMany(mappedBy = "targetWarehouse")
    private List<StockMovement> targetMovements;



}
