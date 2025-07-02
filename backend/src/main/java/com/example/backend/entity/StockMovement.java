package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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
    @JoinColumn(name = "source_warehouse")
    private Warehouse sourceWarehouse;

    @ManyToOne
    @JoinColumn(name = "target_warehouse")
    private Warehouse targetWarehouse;


    @Column(name = "related_order_id", nullable = false)
    private Long relatedOrderId;

    @Column
    private String note;

    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDate updatedAt;




}
