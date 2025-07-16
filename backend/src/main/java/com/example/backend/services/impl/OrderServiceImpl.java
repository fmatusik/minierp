package com.example.backend.services.impl;

import com.example.backend.dto.*;
import com.example.backend.entity.*;
import com.example.backend.mapper.AddressMapper;
import com.example.backend.mapper.ClientMapper;
import com.example.backend.mapper.OrderMapper; // Ensure this is imported
import com.example.backend.mapper.StatusMapper;
import com.example.backend.repository.*;
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
    @Autowired
    private DataRepository dataRepository;


    @Override
    public List<OrderFindDto> findAllOrdersDto(){
        List<Order> orders = orderRepository.findAll();
        return orderMapper.toDtoFindList(orders);
    }

    @Override
    public OrderFindDto findById(Long id){
        Order order = orderRepository.findById((long)id).orElseThrow();
        ClientDto clientDto = ClientMapper.toDto(order.getClient());
        StatusDto statusDto = StatusMapper.toDto(order.getStatus());
        AddressDto addressDto = AddressMapper.toDto(order.getAddress());
        OrderFindDto orderFindDto = orderMapper.toDtoFind(order, clientDto , statusDto, addressDto);
        return orderFindDto;
    }

    @Override
    public OrderAddDto addOrder(OrderAddDto orderAddDto) {

        String nextDocumentNumber = generateNextDocumentNumber(findLastDocumentNumber());
        orderAddDto.setDocumentNumber(nextDocumentNumber);
        Client client = clientRepository.findById((long) orderAddDto.getClientId());
        Status status = statusRepository.findById((long) orderAddDto.getStatusId());
        Address address = addressRepository.findById((long) orderAddDto.getAddressId());

        Order orderEntity = orderMapper.toEntity(orderAddDto, client, status, address);
        orderEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build());
        orderEntity = orderRepository.save(orderEntity);
        return orderMapper.toDto(orderEntity);
    }

    private Optional<String> findLastDocumentNumber() {
        return orderRepository.findTopByOrderByDocumentNumberDesc()
                .map(Order::getDocumentNumber);
    }

    @Override
    public OrderFindDto updateOrder(OrderAddDto orderAddDto, Long id){
        Order order = orderRepository.findById((long)id).orElseThrow();
        Client client = clientRepository.findById((long) orderAddDto.getClientId());
        Status status = statusRepository.findById((long) orderAddDto.getStatusId());
        Address address = addressRepository.findById((long) orderAddDto.getAddressId());
        Data data = dataRepository.findById((long) orderAddDto.getData().getId());
        data.setUpdatedAt(LocalDateTime.now());
        order.setClient(client);
        order.setStatus(status);
        order.setAddress(address);
        order.setData(data);
        order.setPrice(orderAddDto.getPrice());
        order.setPaymentStatus(orderAddDto.getPaymentStatus());
        order.setDeliveryDate(orderAddDto.getDeliveryDate());
        order.setSalePlace(orderAddDto.getSalePlace());

        orderRepository.save(order);
        return orderMapper.toDtoFind(order, ClientMapper.toDto(client), StatusMapper.toDto(status), AddressMapper.toDto(address));
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