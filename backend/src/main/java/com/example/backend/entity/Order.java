package com.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.micrometer.common.lang.Nullable;
import jakarta.persistence.*;
import lombok.*;
import com.example.backend.entity.Status;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    @JsonBackReference
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status", nullable = false)
    private Status status;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;

    @Column(nullable = false)
    private Double price;

    @Column(name = "\"paymentStatus\"", nullable = false)
    private String paymentStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address", nullable = false)
    private Address address;


    @Column(name = "\"deliveryDate\"", nullable = false)
    private LocalDateTime deliveryDate;

    @Column(name = "\"documentNumber\"", nullable = false)
    private String documentNumber;

    @Column(name = "\"salePlace\"", nullable = false)
    private String salePlace;

    @OneToMany(mappedBy = "relatedOrder", cascade = CascadeType.ALL)
    private List<StockMovement> stockMovements;

    @OneToMany(mappedBy = "relatedOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderItem> orderItems;

}
