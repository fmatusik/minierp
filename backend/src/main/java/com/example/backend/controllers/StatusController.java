package com.example.backend.controllers;


import com.example.backend.dto.StatusDto;
import com.example.backend.entity.Status;
import com.example.backend.enums.StatusType;
import com.example.backend.services.StatusService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/api/status")
public class StatusController {

    @Autowired
    private StatusService statusService;


    @PostMapping("/add")
    public StatusDto addStatus(@RequestBody StatusDto statusDto){
        return statusService.addStatus(statusDto);
    }

    @GetMapping("/all")
    public List<StatusDto> getAllStatuses(){
        return statusService.findAllDto();
    }

    @PutMapping("/edit/{id}")
    public StatusDto updateStatus(@RequestBody StatusDto statusDto, @PathVariable Long id){
        return statusService.updateStatus(statusDto);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStatus(@PathVariable Long id){
        if(statusService.deleteStatus(id)){
            return "Pomyślnie usunięto status";
        }else{
            return "Wystąpił nieoczekiwany problem w trakcie usuwania statusu";
        }
    }

    @GetMapping("/all/product")
    public List<StatusDto> getAllProductStatuses() {
        return statusService.findAllProductStatusesDto();
    }

    @GetMapping("/all/order")
    public List<StatusDto> getAllOrderStatuses(){
        return statusService.findAllOrderStatusesDto();
    }



}
