package com.example.backend.services.impl;

import com.example.backend.dto.StockLevelDto;
import com.example.backend.dto.StockLevelFindDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.Product;
import com.example.backend.entity.StockLevel;
import com.example.backend.entity.Warehouse;
import com.example.backend.mapper.StockLevelMapper;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.StockLevelRepository;
import com.example.backend.repository.WarehouseRepository;
import com.example.backend.services.StockLevelService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@AllArgsConstructor
@Service
public class StockLevelServiceImpl implements StockLevelService {

    private final StockLevelRepository stockLevelRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;




    @Override
    public StockLevelDto addStockLevel(StockLevelDto stockLevelDto) {
        Product product = productRepository.findById(stockLevelDto.getProductId()).orElseThrow(()->new RuntimeException("Nie znaleziono produktu o podanym ID"));
        Warehouse warehouse = warehouseRepository.findById(stockLevelDto.getWarehouseId()).orElseThrow(()->new RuntimeException("Nie znaleziono magazynu o podanym ID"));
        StockLevel stockLevelEntity = StockLevelMapper.toEntity(stockLevelDto, product, warehouse);
        stockLevelEntity.setData(
                Data.builder()
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build()
        );
        StockLevel stockLevelSaved = stockLevelRepository.save(stockLevelEntity);
        return StockLevelMapper.toDto(stockLevelSaved);
    }

    @Override
    public List<StockLevelFindDto> findAll() {
        return StockLevelMapper.toDtoFindList(stockLevelRepository.findAll());
    }

    @Override
    public StockLevelFindDto update(Long id, StockLevelDto stockLevel) {
        StockLevel existing = stockLevelRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono pozycji na magazynie o podanym ID"));
        existing.setMinimumQuantity(stockLevel.getMinimumQuantity());
        Data data = existing.getData();
        data.setUpdatedAt(LocalDateTime.now());
        existing.setData(data);
        StockLevel updated = stockLevelRepository.save(existing);
        return StockLevelMapper.toFindDto(updated);
    }

    @Override
    public List<StockLevelFindDto> findStockLevelByWarehouseId(Long id) {
        return StockLevelMapper.toDtoFindList(stockLevelRepository.findAllByWarehouseId(id));
    }

    @Override
    public StockLevelFindDto appendStockLevel(Long id, Long quantity) {
        StockLevel existing = stockLevelRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono pozycji na magazynie o podanym ID"));
        existing.setQuantity(existing.getQuantity() + quantity);
        Data data = existing.getData();
        data.setUpdatedAt(LocalDateTime.now());
        existing.setData(data);
        StockLevel updated = stockLevelRepository.save(existing);
        return StockLevelMapper.toFindDto(updated);
    }

    @Override
    public StockLevelFindDto decreaseStockLevel(Long id, Long quantity) {
        StockLevel existing = stockLevelRepository.findById(id).orElseThrow(()->new RuntimeException("Nie znaleziono pozycji na magazynie o podanym ID"));
        existing.setQuantity(existing.getQuantity() - quantity);
        Data data = existing.getData();
        data.setUpdatedAt(LocalDateTime.now());
        existing.setData(data);
        StockLevel updated = stockLevelRepository.save(existing);
        return StockLevelMapper.toFindDto(updated);
    }

    @Override
    public Boolean checkIfExists(Long productId, Long warehouseId) {
        List<StockLevel> existing = stockLevelRepository.findAllByWarehouseIdAndProductId(warehouseId, productId);
        return !existing.isEmpty();
    }

    @Override
    public String deleteStockLevel(Long id) {
        if(stockLevelRepository.existsById(id)){
            stockLevelRepository.deleteById(id);
            return "Pomyślnie usunięto stan magazynowy";
        }else{
            return "Nie odnaleziono danego poziomu magazynowego";
        }
    }

    @Override
    public ResponseEntity<byte[]> exportStockLevelsToCSV() throws IOException {
        List<String[]> dataLines = stockLevelRepository.findAll().stream()
                .map(sl -> new String[]{
                        sl.getId().toString(),
                        sl.getProduct().getName(),
                        sl.getWarehouse().getName(),
                        sl.getQuantity().toString(),
                        sl.getMinimumQuantity().toString()
                })
                .collect(Collectors.toList());

        StringBuilder csvBuilder = new StringBuilder();
        // Write header
        csvBuilder.append(convertToCSV(new String[]{"Id", "Product", "Warehouse", "Quantity", "MinimumQuantity"})).append("\n");
        // Write data lines
        dataLines.forEach(line -> csvBuilder.append(convertToCSV(line)).append("\n"));

        byte[] csvBytes = csvBuilder.toString().getBytes(StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=stock_levels.csv")
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
