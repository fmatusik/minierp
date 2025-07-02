package com.example.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "`order`") // ORDER to słowo zastrzeżone w SQL – należy ująć w cudzysłowy
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "client_id", nullable = false)
    private Long clientId;

    @Enumerated(EnumType.STRING)
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

    @Column(name = "shipping_address_id", nullable = false)
    private Long shippingAddressId;

    @Column(name = "delivery_date", nullable = false)
    private LocalDate deliveryDate;

    @Column(name = "document_number", nullable = false)
    private Long documentNumber;

    @Column(name = "sale_place", nullable = false)
    private String salePlace;

    // Konstruktor bezargumentowy wymagany przez JPA
    protected Order() {}

    // Konstruktor z polami (bez ID i timestampów)
    public Order(Long clientId, String orderStatus, Long price, String paymentStatus,
                 Long shippingAddressId, LocalDate deliveryDate, Long documentNumber, String salePlace) {
        this.clientId = clientId;
        this.orderStatus = orderStatus;
        this.price = price;
        this.paymentStatus = paymentStatus;
        this.shippingAddressId = shippingAddressId;
        this.deliveryDate = deliveryDate;
        this.documentNumber = documentNumber;
        this.salePlace = salePlace;
    }

    // Gettery

    public Long getId() {
        return id;
    }

    public Long getClientId() {
        return clientId;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public Long getPrice() {
        return price;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public Long getShippingAddressId() {
        return shippingAddressId;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public Long getDocumentNumber() {
        return documentNumber;
    }

    public String getSalePlace() {
        return salePlace;
    }
}
