package com.example.backend.entity;

import com.example.backend.enums.StockMovementType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"STOCK_MOVEMENT\"")
public class StockMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String stockMovementNumber;

    @ManyToOne
    @JoinColumn(name = "\"sourceWarehouse\"")
    private Warehouse sourceWarehouse;

    @ManyToOne
    @JoinColumn(name = "\"targetWarehouse\"")
    private Warehouse targetWarehouse;



    @ManyToOne
    @JoinColumn(name = "\"relatedOrder\"")
    private Order relatedOrder;


    @Column(length = 4000)
    private String note;

    @Column
    private StockMovementType type;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "data")
    private Data data;

    @OneToMany(mappedBy = "stockMovement", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<StockMovementItem> stockMovementItems;





}
