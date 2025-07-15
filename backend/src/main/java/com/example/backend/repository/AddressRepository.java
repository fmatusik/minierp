package com.example.backend.repository;

import com.example.backend.entity.Address;
import com.example.backend.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface AddressRepository extends JpaRepository<Address, Long> {


    List<Address> findByClient(Client client);
    Address findById(long id);
}
