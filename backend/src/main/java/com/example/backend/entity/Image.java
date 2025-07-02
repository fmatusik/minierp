package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"IMAGE\"")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String path;

    @Column(nullable = false)
    private String alt;

    @Column(nullable = false)
    private Long size;

    @Column(name = "is_thumbnail", nullable = false)
    private Boolean isThumbnail;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
