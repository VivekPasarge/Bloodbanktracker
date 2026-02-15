package com.yourorg.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import com.yourorg.bloodbank.entity.DonorProfile;
import com.yourorg.bloodbank.repository.DonorProfileRepository;
import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "http://localhost:5173")
public class DonorController {
    private final DonorProfileRepository donorRepo;
    public DonorController(DonorProfileRepository donorRepo){ this.donorRepo = donorRepo; }

    @GetMapping
    public List<DonorProfile> all(){ return donorRepo.findAll(); }

    @PostMapping
    public DonorProfile create(@RequestBody DonorProfile p){ return donorRepo.save(p); }
}
