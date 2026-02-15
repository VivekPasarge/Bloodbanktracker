package com.yourorg.bloodbank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourorg.bloodbank.entity.BloodRequest;

public interface RequestRepository extends JpaRepository<BloodRequest, Long> {
    // add custom queries if you need (by hospitalId, status, etc.)
}
