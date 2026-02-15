package com.yourorg.bloodbank.repository;

import com.yourorg.bloodbank.entity.BloodInventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BloodInventoryRepository extends JpaRepository<BloodInventory, Long> {
    Optional<BloodInventory> findByBloodType(String bloodType);
}
