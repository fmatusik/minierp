package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"ORDER_INFO\"") // ORDER to słowo zastrzeżone w SQL – należy ująć w cudzysłowy
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client")
    private Client client;

    @Column(name = "\"orderStatus\"")
    private String orderStatus; //add object

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;

    @Column(nullable = false)
    private Long price;

    @Column(name = "\"paymentStatus\"", nullable = false)
    private String paymentStatus;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address")
    private Address address;

    @Column(name = "\"deliveryDate\"", nullable = false)
    private LocalDateTime deliveryDate;

    @Column(name = "\"documentNumber\"", nullable = false)
    private String documentNumber;

    @Column(name = "\"salePlace\"", nullable = false)
    private String salePlace;

    @OneToMany(mappedBy = "relatedOrder", cascade = CascadeType.ALL)
    private List<StockMovement> stockMovements;


}
