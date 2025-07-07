package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"STOCK_LEVEL\"")
public class StockLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product")
    private Product product;



    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "warehouse")
    private Warehouse warehouse;

    @Column(nullable = false)
    private Long quantity;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;


}
