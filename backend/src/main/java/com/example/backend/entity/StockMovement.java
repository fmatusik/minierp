package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"STOCK_MOVEMENT\"")
public class StockMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne
    @JoinColumn(name = "\"sourceWarehouse\"")
    private Warehouse sourceWarehouse;

    @ManyToOne
    @JoinColumn(name = "\"targetWarehouse\"")
    private Warehouse targetWarehouse;



    @ManyToOne
    @JoinColumn(name = "\"relatedOrder\"")
    private Order relatedOrder;


    @Column
    private String note;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;




}
