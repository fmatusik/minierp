package com.example.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Float price;

    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDate updatedAt;

    @Column
    private String description;

    @Column
    private String notes;

    @Column(nullable = false)
    private String sku;

    @Column
    private Float weight;

    @Column
    private Float dimensions;

    @Column(name = "status_id", nullable = false)
    private Long statusId;

    @Column(name = "categories_id", nullable = false)
    private Long categoriesId;

    // Konstruktor bezargumentowy wymagany przez JPA
    public Product() {}

    // Konstruktor z wymaganymi polami (bez ID)
    public Product(String name, Float price, LocalDate createdAt, LocalDate updatedAt,
                   String description, String notes, String sku, Float weight,
                   Float dimensions, Long statusId, Long categoriesId) {
        this.name = name;
        this.price = price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.description = description;
        this.notes = notes;
        this.sku = sku;
        this.weight = weight;
        this.dimensions = dimensions;
        this.statusId = statusId;
        this.categoriesId = categoriesId;
    }

    // Gettery

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Float getPrice() {
        return price;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public String getDescription() {
        return description;
    }

    public String getNotes() {
        return notes;
    }

    public String getSku() {
        return sku;
    }

    public Float getWeight() {
        return weight;
    }

    public Float getDimensions() {
        return dimensions;
    }

    public Long getStatusId() {
        return statusId;
    }

    public Long getCategoriesId() {
        return categoriesId;
    }

    public void setName(String testowyProdukt) {
        this.name = testowyProdukt;
    }
}
