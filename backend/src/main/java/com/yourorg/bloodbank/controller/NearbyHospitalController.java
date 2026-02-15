package com.yourorg.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import com.yourorg.bloodbank.entity.NearbyHospital;
import com.yourorg.bloodbank.repository.NearbyHospitalRepository;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "http://localhost:5173")
public class NearbyHospitalController {
    private final NearbyHospitalRepository repo;
    public NearbyHospitalController(NearbyHospitalRepository repo){ this.repo = repo; }

    @GetMapping
    public List<NearbyHospital> all(@RequestParam(required = false) String city){
        if(city==null) return repo.findAll();
        return repo.findByCity(city);
    }

    @PostMapping
    public NearbyHospital create(@RequestBody NearbyHospital h){ return repo.save(h); }
}
