package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stock_levels")
public class StockLevels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "warehouse_id", nullable = false)
    private Long warehouseId;

    @Column(nullable = false)
    private Long quantity;

    // Konstruktor bezargumentowy wymagany przez JPA
    protected StockLevels() {}

    // Konstruktor z wszystkimi wymaganymi polami (bez id)
    public StockLevels(Long productId, Long warehouseId, Long quantity) {
        this.productId = productId;
        this.warehouseId = warehouseId;
        this.quantity = quantity;
    }

    // Gettery

    public Long getId() {
        return id;
    }

    public Long getProductId() {
        return productId;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public Long getQuantity() {
        return quantity;
    }
}
