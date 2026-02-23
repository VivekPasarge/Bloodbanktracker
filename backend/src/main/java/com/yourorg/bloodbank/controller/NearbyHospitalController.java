package com.yourorg.bloodbank.controller;

import com.yourorg.bloodbank.entity.NearbyHospital;
import com.yourorg.bloodbank.repository.NearbyHospitalRepository;
import com.yourorg.bloodbank.service.HospitalCsvService;
import com.yourorg.bloodbank.service.NearbyHospitalService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "http://localhost:5173")
public class NearbyHospitalController {

    private final NearbyHospitalRepository repo;
    private final HospitalCsvService csvService;
    private final NearbyHospitalService nearbyService;

    public NearbyHospitalController(
            NearbyHospitalRepository repo,
            HospitalCsvService csvService,
            NearbyHospitalService nearbyService
    ) {
        this.repo = repo;
        this.csvService = csvService;
        this.nearbyService = nearbyService;
    }

    // ================= GET ALL / BY CITY =================
    @GetMapping
    public List<NearbyHospital> all(@RequestParam(required = false) String city) {
        if (city == null || city.isBlank()) {
            return repo.findAll();
        }
        return repo.findByCityIgnoreCase(city);
    }

    // ================= SMART SEARCH =================
    @GetMapping("/nearest")
    public List<NearbyHospital> getHospitalsSmart(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(required = false) String city,
            @RequestParam(defaultValue = "10") int radius
    ) {

        // ✅ CITY SEARCH → return ALL hospitals in that city
        if (city != null && !city.isBlank()) {
            return repo.findByCityIgnoreCase(city);
        }

        // ✅ AREA SEARCH → distance based
        return nearbyService.getNearestHospitals(lat, lng, radius);
    }

    // ================= ADMIN =================
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public NearbyHospital create(@RequestBody NearbyHospital h) {
        return repo.save(h);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NearbyHospital> update(
            @PathVariable Long id,
            @RequestBody NearbyHospital body
    ) {
        return repo.findById(id)
                .map(h -> {
                    h.setName(body.getName());
                    h.setAddress(body.getAddress());
                    h.setCity(body.getCity());
                    h.setPhone(body.getPhone());
                    h.setLatitude(body.getLatitude());
                    h.setLongitude(body.getLongitude());
                    return ResponseEntity.ok(repo.save(h));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/import")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> importCsv() {
        csvService.importCsv();
        return ResponseEntity.ok("Hospitals imported successfully");
    }
}