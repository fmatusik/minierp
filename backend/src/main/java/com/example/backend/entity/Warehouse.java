package com.example.backend.entity;

import com.example.backend.enums.WarehouseType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Builder
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

    @Column(nullable = false)
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address")
    private Address address;

    @Column(nullable = false)
    private WarehouseType type;

    @Column(nullable = false)
    private Double capacity;


    @OneToMany(mappedBy = "sourceWarehouse")
    private List<StockMovement> sourceMovements;

    @OneToMany(mappedBy = "targetWarehouse")
    private List<StockMovement> targetMovements;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;

    @OneToMany(mappedBy = "warehouse")
    private List<StockLevel> stockLevels;



}
