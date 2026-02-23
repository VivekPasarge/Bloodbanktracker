package com.yourorg.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import com.yourorg.bloodbank.entity.BloodInventory;
import com.yourorg.bloodbank.repository.BloodInventoryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryController {

    private final BloodInventoryRepository repo;

    public InventoryController(BloodInventoryRepository repo){
        this.repo = repo;
    }

    // GET ALL
    @GetMapping
    public List<BloodInventory> all(){
        return repo.findAll();
    }

    // CREATE OR UPDATE BY BLOOD TYPE
    @PostMapping
    public BloodInventory upsert(@RequestBody BloodInventory b){
        return repo.findByBloodType(b.getBloodType())
            .map(existing -> {
                existing.setUnits(b.getUnits());
                return repo.save(existing);
            })
            .orElseGet(() -> repo.save(b));
    }

    // DELETE BY ID  ✅ (THIS WAS MISSING)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        repo.deleteById(id);
    }
}
