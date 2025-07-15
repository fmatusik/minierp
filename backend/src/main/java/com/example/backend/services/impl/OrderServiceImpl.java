package com.example.backend.services.impl;

import com.example.backend.dto.OrderAddDto;
import com.example.backend.dto.OrderFindDto;
import com.example.backend.entity.*;
import com.example.backend.mapper.OrderMapper; // Ensure this is imported
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.ClientRepository;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.StatusRepository;
import com.example.backend.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private final OrderRepository orderRepository;
    @Autowired
    private final OrderMapper orderMapper;
    private final ClientRepository clientRepository;
    private final StatusRepository statusRepository;
    @Autowired
    private AddressRepository addressRepository;


    @Override
    public List<OrderFindDto> findAllOrdersDto(){
        List<Order> orders = orderRepository.findAll();
        return orderMapper.toDtoFindList(orders);
    }

    @Override
    public OrderAddDto addOrder(OrderAddDto orderAddDto) {

        // 1. Wygeneruj numer dokumentu
        String nextDocumentNumber = generateNextDocumentNumber(findLastDocumentNumber());
        // Ustaw wygenerowany numer w DTO przed mapowaniem na encję
        orderAddDto.setDocumentNumber(nextDocumentNumber);
        // Call toEntity on the injected orderMapper instance
        Client client = clientRepository.findById((long) orderAddDto.getClientId());
        Status status = statusRepository.findById((long) orderAddDto.getStatusId());
        Address address = addressRepository.findById((long) orderAddDto.getAddressId());

        Order orderEntity = orderMapper.toEntity(orderAddDto, client, status, address);
        orderEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build());
        orderEntity = orderRepository.save(orderEntity);
        // Call toDto on the injected orderMapper instance
        return orderMapper.toDto(orderEntity);
    }

    private Optional<String> findLastDocumentNumber() {
        // This is a placeholder. You need to define a method in your
        // OrderRepository to retrieve the highest document number.
        // For example, if your Order entity has a 'documentNumber' field:
        return orderRepository.findTopByOrderByDocumentNumberDesc()
                .map(Order::getDocumentNumber);
    }


    private String generateNextDocumentNumber(Optional<String> lastDocumentNumberOpt) {
        String prefix = "ORD-";
        if (lastDocumentNumberOpt.isEmpty()) {
            return prefix + "001"; // Pierwsze zamówienie
        }

        String lastNumber = lastDocumentNumberOpt.get();
        if (lastNumber.startsWith(prefix)) {
            String suffix = lastNumber.substring(prefix.length());

            try {
                // Próba parsowania jako numer (np. "001", "099")
                int num = Integer.parseInt(suffix);
                if (num < 999) { // Jeśli mniej niż 999, po prostu inkrementuj
                    return prefix + String.format("%03d", num + 1);
                } else { // Jeśli 999, przełącz na alfanumeryczny
                    return prefix + "A01";
                }
            } catch (NumberFormatException e) {
                // Nie jest to wyłącznie numeryczny sufiks, zakładamy, że jest alfanumeryczny (np. "A01", "Z99")
                if (suffix.length() == 3 &&
                        Character.isLetter(suffix.charAt(0)) &&
                        Character.isDigit(suffix.charAt(1)) &&
                        Character.isDigit(suffix.charAt(2))) {

                    char letter = suffix.charAt(0);
                    int num = Integer.parseInt(suffix.substring(1));

                    if (num < 99) { // Inkrementuj część numeryczną
                        return prefix + letter + String.format("%02d", num + 1);
                    } else { // Część numeryczna to 99, inkrementuj literę
                        if (letter == 'Z') {
                            throw new IllegalStateException("Wyczerpano maksymalną liczbę alfanumerycznych numerów zamówień (ORD-Z99)");
                        }
                        return prefix + ((char) (letter + 1)) + "01";
                    }
                }
            }
        }
        // Fallback dla nieoczekiwanych formatów lub jeśli istniejące numery nie pasują do oczekiwanego wzorca.
        // W przypadku produkcji, może być potrzebna bardziej zaawansowana obsługa błędów lub strategia migracji danych.
        return prefix + "001"; // Domyślny dla nieobsłużonych lub nieprawidłowych istniejących numerów
    }

}