package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"ORDER_ITEM\"")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order", referencedColumnName = "id")
    private Order order;

    @OneToOne
    @JoinColumn(name = "product", referencedColumnName = "id")
    private Product product;

    @Column(nullable = false)
    private Long quantity;

    @Column(nullable = false)
    private Long price;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;


}
