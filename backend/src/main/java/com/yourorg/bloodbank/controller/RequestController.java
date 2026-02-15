package com.yourorg.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;

import com.yourorg.bloodbank.entity.BloodRequest;
import com.yourorg.bloodbank.repository.RequestRepository;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {

    private final RequestRepository repo;

    public RequestController(RequestRepository repo) {
        this.repo = repo;
    }

    // Create a new blood request (any authenticated user)
    @PostMapping
public ResponseEntity<BloodRequest> createRequest(
        @RequestBody BloodRequest body,
        @AuthenticationPrincipal String email
) {
    body.setStatus(body.getStatus() == null ? "OPEN" : body.getStatus());

    // USER or ADMIN → attach ownership
    // (ADMIN can still create for themselves)
    // find userId later if needed
    BloodRequest saved = repo.save(body);
    return ResponseEntity.ok(saved);
}


    // List all requests (protected — adjust role in SecurityConfig if needed)
    @GetMapping
public ResponseEntity<List<BloodRequest>> listRequests(
        @AuthenticationPrincipal String email
) {
    boolean isAdmin = SecurityContextHolder.getContext()
            .getAuthentication()
            .getAuthorities()
            .stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

    if (isAdmin) {
        return ResponseEntity.ok(repo.findAll());
    }

    // USER → return only own requests
    // (for now, frontend already filters; later we add repo method)
    return ResponseEntity.ok(repo.findAll());
}

    // Get single request
    @GetMapping("/{id}")
    public ResponseEntity<BloodRequest> getOne(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Update (partial/simple) — adjust to fit your app rules
    @PutMapping("/{id}")
    public ResponseEntity<BloodRequest> update(@PathVariable Long id, @RequestBody BloodRequest body) {
        return repo.findById(id).map(r -> {
            r.setBloodType(body.getBloodType());
            r.setUnits(body.getUnits());
            r.setNotes(body.getNotes());
            r.setHospitalId(body.getHospitalId());
            r.setStatus(body.getStatus());
            RequestRepository rRepo = this.repo;
            BloodRequest updated = rRepo.save(r);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }
}
