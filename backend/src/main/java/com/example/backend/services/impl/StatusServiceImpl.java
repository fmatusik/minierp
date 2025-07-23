package com.example.backend.services.impl;

import com.example.backend.dto.StatusDto;
import com.example.backend.entity.Data;
import com.example.backend.entity.Status;
import com.example.backend.enums.StatusType;
import com.example.backend.mapper.StatusMapper;
import com.example.backend.repository.StatusRepository;
import com.example.backend.services.StatusService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;


    @Override
    public StatusDto addStatus(StatusDto statusDto) {
        Status statusEntity = StatusMapper.toEntity(statusDto);
        statusEntity.setData(Data.builder()
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build());
        statusEntity = statusRepository.save(statusEntity);
        return StatusMapper.toDto(statusEntity);
    }

    @Override
    public List<StatusDto> findAllDto() {
        return StatusMapper.toDtoList(statusRepository.findAll());
    }

    @Override
    public StatusDto updateStatus(StatusDto statusDto) {
        Status existing = statusRepository.findById(statusDto.getId())
                .orElseThrow(() -> new RuntimeException("Status nie istnieje"));
        existing.setName(statusDto.getName());
        existing.setType(statusDto.getType());
        existing.setColor(statusDto.getColor());
        Data data = existing.getData();
        if (data == null) {
            data = new Data();
            data.setCreatedAt(LocalDateTime.now());
        }
        data.setUpdatedAt(LocalDateTime.now());
        existing.setData(data);

        statusRepository.save(existing);
        return StatusMapper.toDto(existing);
    }

    @Override
    public String deleteStatus(Long id) {
        try {
            if (!statusRepository.existsById(id)) {
                return "Nie odnaleziono statusu o podanym ID";
            }
            statusRepository.deleteById(id);
            return "Pomyślnie usunięto status";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<StatusDto> findAllProductStatusesDto() {
        return statusRepository.findAllByType(StatusType.PRODUCT);
    }
    @Override
    public List<StatusDto> findAllOrderStatusesDto(){
        return statusRepository.findAllByType(StatusType.ORDER);
    }

}
