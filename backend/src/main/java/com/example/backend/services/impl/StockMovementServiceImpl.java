package com.example.backend.services.impl;

import com.example.backend.dto.OrderAddDto;
import com.example.backend.dto.StockMovementDto;
import com.example.backend.dto.StockMovementFindDto;
import com.example.backend.entity.*;
import com.example.backend.mapper.StockMovementMapper;
import com.example.backend.repository.*;
import com.example.backend.services.StockMovementService;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.NaturalId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@AllArgsConstructor
@Service
public class StockMovementServiceImpl implements StockMovementService {

    private final StockMovementRepository stockMovementRepository;
    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final WarehouseRepository warehouseRepository;


    @Override
    public StockMovementDto addStockMovement(StockMovementDto stockMovementDto) {
        Order order = null;
        if(stockMovementDto.getRelatedOrderId() != null ) {
            order = orderRepository.findById( (long) stockMovementDto.getRelatedOrderId());
        }

        Warehouse sourceWarehouse = warehouseRepository.findById((long) stockMovementDto.getSourceWarehouseId());
        Warehouse targetWarehouse = null;
        if(stockMovementDto.getTargetWarehouseId() != null) {
            targetWarehouse = warehouseRepository.findById((long) stockMovementDto.getTargetWarehouseId());
        }
        stockMovementDto.setStockMovementNumber(generateNextDocumentNumber(findLastDocumentNumber()));
       StockMovement stockMovementEntity = StockMovementMapper.toEntity(stockMovementDto, order != null ? order : null, sourceWarehouse, targetWarehouse);
        Data data = Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        stockMovementEntity.setData(data);
        StockMovement savedStockMovement = stockMovementRepository.save(stockMovementEntity);
        return StockMovementMapper.toDto(savedStockMovement);
    }

    @Override
    public List<StockMovementFindDto> findAll() {
        return StockMovementMapper.toDtoFindList(stockMovementRepository.findAll());
    }

    @Override
    public String deleteById(Long id) {
        if(stockMovementRepository.existsById(id)){
            stockMovementRepository.deleteById(id);
            return "Pomyślnie usunięto ruch magazynowy";
        }else{
            return "Wystąpił nieoczekiwany problem w trakcie usuwania ruchu magazynowego";
        }
    }

    private Optional<String> findLastDocumentNumber() {
        return stockMovementRepository.findTopByOrderByStockMovementNumberDesc()
                .map(StockMovement::getStockMovementNumber);
    }

    private String generateNextDocumentNumber(Optional<String> lastDocumentNumberOpt) {
        String prefix = "MOV-";
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



    @Override
    public ResponseEntity<byte[]> exportStockMovementsToCSV() throws IOException {
        List<String[]> dataLines = stockMovementRepository.findAll().stream()
                .map(sm -> new String[]{
                        sm.getStockMovementNumber(),
                        sm.getType().toString(),
                        sm.getSourceWarehouse().getName(),
                        sm.getTargetWarehouse() != null ? sm.getTargetWarehouse().getName() : "",
                        sm.getData().getCreatedAt().toString(),
                })
                .collect(Collectors.toList());

        StringBuilder csvBuilder = new StringBuilder();
        // Nagłówek CSV - 8 kolumn
        csvBuilder.append(convertToCSV(new String[]{
                "Stock Movement Number","Type", "Source Warehouse", "Target Warehouse", "Data"
        })).append("\n");

        // Dane
        dataLines.forEach(line -> csvBuilder.append(convertToCSV(line)).append("\n"));

        byte[] csvBytes = csvBuilder.toString().getBytes(StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=orders.csv")
                .header("Content-Type", "text/csv")
                .body(csvBytes);
    }



    private String escapeSpecialCharacters(String data) {
        String escapedData = data.replaceAll("\"", "\"\"");
        if (data.contains(",") || data.contains("\"") || data.contains("\n")) {
            return "\"" + escapedData + "\"";
        } else {
            return data;
        }

    }


    public String convertToCSV(String[] data) {
        return Stream.of(data)
                .map(this::escapeSpecialCharacters)
                .collect(Collectors.joining(","));
    }
}
