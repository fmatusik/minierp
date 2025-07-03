package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

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
    @JoinColumn(name = "source_warehouse")
    private Warehouse sourceWarehouse;

    @ManyToOne
    @JoinColumn(name = "target_warehouse")
    private Warehouse targetWarehouse;



    @ManyToOne
    @JoinColumn(name = "related_order")
    private Order relatedOrder;


    @Column
    private String note;

    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDate updatedAt;




}
