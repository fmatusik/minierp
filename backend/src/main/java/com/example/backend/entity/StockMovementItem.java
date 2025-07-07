package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"STOCK_MOVEMENT_ITEM\"")
public class StockMovementItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "\"stockMovement\"")
    private StockMovement stockMovement;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product")
    private Product product;

    @Column(nullable = false)
    private Long quantity;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;




}
