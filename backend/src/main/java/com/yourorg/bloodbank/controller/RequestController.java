package com.yourorg.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;

import com.yourorg.bloodbank.entity.BloodRequest;
import com.yourorg.bloodbank.entity.User;
import com.yourorg.bloodbank.repository.RequestRepository;
import com.yourorg.bloodbank.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RequestController {

    private final RequestRepository requestRepo;
    private final UserRepository userRepo;

    public RequestController(RequestRepository requestRepo, UserRepository userRepo) {
        this.requestRepo = requestRepo;
        this.userRepo = userRepo;
    }

    // ================= CREATE REQUEST =================
    @PostMapping
    public ResponseEntity<BloodRequest> createRequest(
            @RequestBody BloodRequest body
    ) {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName(); // ✅ SAFE

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        body.setRequestedByUserId(user.getId());
        body.setStatus("PENDING");

        return ResponseEntity.ok(requestRepo.save(body));
    }

    // ================= LIST REQUESTS =================
    @GetMapping
    public ResponseEntity<List<BloodRequest>> listRequests() {

        var auth = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = auth.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            return ResponseEntity.ok(requestRepo.findAll());
        }

        String email = auth.getName();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(
                requestRepo.findByRequestedByUserId(user.getId())
        );
    }

    // ================= UPDATE STATUS ONLY =================
    @PutMapping("/{id}")
    public ResponseEntity<BloodRequest> updateStatus(
            @PathVariable Long id,
            @RequestBody BloodRequest body
    ) {
        return requestRepo.findById(id).map(r -> {
            if (body.getStatus() != null) {
                r.setStatus(body.getStatus());
            }
            return ResponseEntity.ok(requestRepo.save(r));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ================= DELETE =================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        requestRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
