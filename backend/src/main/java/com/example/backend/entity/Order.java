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

    @Column(name = "order_status")
    private String orderStatus; //add object

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private Long price;

    @Column(name = "payment_status", nullable = false)
    private String paymentStatus;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address")
    private Address address;

    @Column(name = "delivery_date", nullable = false)
    private LocalDate deliveryDate;

    @Column(name = "document_number", nullable = false)
    private Long documentNumber;

    @Column(name = "sale_place", nullable = false)
    private String salePlace;

    @OneToMany(mappedBy = "relatedOrder")
    private List<StockMovement> stockMovements;


}
