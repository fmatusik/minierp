package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "image")
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

    // Konstruktor bezargumentowy wymagany przez JPA
    protected Image() {}

    // Konstruktor z polami (bez id)
    public Image(String path, String alt, Long size, Boolean isThumbnail) {
        this.path = path;
        this.alt = alt;
        this.size = size;
        this.isThumbnail = isThumbnail;
    }

    // Getter'y

    public Long getId() {
        return id;
    }

    public String getPath() {
        return path;
    }

    public String getAlt() {
        return alt;
    }

    public Long getSize() {
        return size;
    }

    public Boolean getIsThumbnail() {
        return isThumbnail;
    }
}
