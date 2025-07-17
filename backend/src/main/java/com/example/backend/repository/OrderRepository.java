package com.example.backend.repository;

import com.example.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findTopByOrderByDocumentNumberDesc();
    Order findById(long id);
}
