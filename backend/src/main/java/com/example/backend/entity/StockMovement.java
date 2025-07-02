package com.example.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "stock_movement")
public class StockMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "source_warehouse_id", nullable = false)
    private Long sourceWarehouseId;

    @Column(name = "target_warehouse_id", nullable = false)
    private Long targetWarehouseId;

    @Column(name = "related_order_id", nullable = false)
    private Long relatedOrderId;

    @Column
    private String note;

    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDate updatedAt;

    // Konstruktor bezargumentowy wymagany przez JPA
    protected StockMovement() {}

    // Konstruktor użytkowy (bez id)
    public StockMovement(Long sourceWarehouseId, Long targetWarehouseId, Long relatedOrderId,
                         String note, LocalDate createdAt, LocalDate updatedAt) {
        this.sourceWarehouseId = sourceWarehouseId;
        this.targetWarehouseId = targetWarehouseId;
        this.relatedOrderId = relatedOrderId;
        this.note = note;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Gettery

    public Long getId() {
        return id;
    }

    public Long getSourceWarehouseId() {
        return sourceWarehouseId;
    }

    public Long getTargetWarehouseId() {
        return targetWarehouseId;
    }

    public Long getRelatedOrderId() {
        return relatedOrderId;
    }

    public String getNote() {
        return note;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }
}
