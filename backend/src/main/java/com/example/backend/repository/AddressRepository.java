package com.example.backend.repository;

import com.example.backend.entity.Address;
import com.example.backend.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AddressRepository extends JpaRepository<Address, Long> {

    Address findAddressById(Long id);

    Address findAddressByClientContact_Client_name(String clientContactClientName);

    Address findAddressByClientContact_Client_email(String clientContactClientEmail);

}
