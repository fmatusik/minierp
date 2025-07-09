package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;

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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "\"orderItems\"")
    private List<OrderItem> orderItems;



}
