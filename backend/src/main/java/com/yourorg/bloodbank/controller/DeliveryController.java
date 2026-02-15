package com.yourorg.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import com.yourorg.bloodbank.entity.Delivery;
import com.yourorg.bloodbank.repository.DeliveryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = "http://localhost:5173")
public class DeliveryController {
    private final DeliveryRepository repo;
    public DeliveryController(DeliveryRepository repo){ this.repo = repo; }

    @GetMapping
    public List<Delivery> all(){ return repo.findAll(); }

    @PostMapping
    public Delivery create(@RequestBody Delivery d){ d.setStatus(d.getStatus()==null?"PENDING":d.getStatus()); return repo.save(d); }

    @PutMapping("/{id}/status")
    public Delivery updateStatus(@PathVariable Long id, @RequestParam String status){
        return repo.findById(id).map(existing -> { existing.setStatus(status); return repo.save(existing); })
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
    }
}
