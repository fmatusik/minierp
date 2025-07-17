package com.example.backend.entity;

import com.example.backend.enums.StockMovementType;
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

    @Column
    private String stockMovementNumber;

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

    @Column
    private StockMovementType type;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;




}
