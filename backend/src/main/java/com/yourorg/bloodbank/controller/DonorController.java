package com.yourorg.bloodbank.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yourorg.bloodbank.entity.DonorProfile;
import com.yourorg.bloodbank.repository.DonorProfileRepository;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "http://localhost:5173")
public class DonorController {

    private final DonorProfileRepository donorRepo;

    public DonorController(DonorProfileRepository donorRepo) {
        this.donorRepo = donorRepo;
    }

    // ================= GET ALL DONORS =================
    @GetMapping
    public List<DonorProfile> getAllDonors() {
        return donorRepo.findAll();
    }

    // ================= CREATE DONOR (ADMIN ONLY) =================
    @PostMapping
    public DonorProfile createDonor(@RequestBody DonorProfile donor) {

        if (donor.getName() == null || donor.getName().trim().isEmpty()) {
            throw new RuntimeException("Donor name is required");
        }

        donor.setAvailable(false);
        donor.setStatus("PENDING");

        return donorRepo.save(donor);
    }

    // ================= APPROVE DONOR =================
    @PutMapping("/{id}/approve")
    public DonorProfile approveDonor(@PathVariable Long id) {
        return donorRepo.findById(id)
                .map(d -> {
                    d.setAvailable(true);
                    d.setStatus("APPROVED");
                    return donorRepo.save(d);
                })
                .orElseThrow(() -> new RuntimeException("Donor not found"));
    }

    // ================= DELETE DONOR =================
    @DeleteMapping("/{id}")
    public void deleteDonor(@PathVariable Long id) {
        donorRepo.deleteById(id);
    }
}
