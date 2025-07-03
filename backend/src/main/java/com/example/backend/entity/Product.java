package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"PRODUCT\"")
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


    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "status")
    private Status status;

    @OneToMany(mappedBy = "id")
    private List<Category> categories;

    @OneToMany(mappedBy = "id")
    private List<Image> images;

    @OneToMany(mappedBy = "id")
    private List<StockLevel> stockLevels;

}
