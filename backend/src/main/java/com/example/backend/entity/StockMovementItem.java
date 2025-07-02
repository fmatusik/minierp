package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stock_movement_item")
public class StockMovementItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "stock_movement_id", nullable = false)
    private Long stockMovementId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(nullable = false)
    private Long quantity;

    // Konstruktor bezargumentowy wymagany przez JPA
    protected StockMovementItem() {}

    // Konstruktor użytkowy
    public StockMovementItem(Long stockMovementId, Long productId, Long quantity) {
        this.stockMovementId = stockMovementId;
        this.productId = productId;
        this.quantity = quantity;
    }

    // Gettery

    public Long getId() {
        return id;
    }

    public Long getStockMovementId() {
        return stockMovementId;
    }

    public Long getProductId() {
        return productId;
    }

    public Long getQuantity() {
        return quantity;
    }
}
