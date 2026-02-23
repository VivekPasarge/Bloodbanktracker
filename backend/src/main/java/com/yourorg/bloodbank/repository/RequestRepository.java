package com.yourorg.bloodbank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.yourorg.bloodbank.entity.BloodRequest;

public interface RequestRepository extends JpaRepository<BloodRequest, Long> {

    // USER → see only own requests
    List<BloodRequest> findByRequestedByUserId(Long userId);

    // ADMIN → count urgent requests
    @Query("SELECT COUNT(r) FROM BloodRequest r WHERE r.status = 'URGENT'")
    int countUrgentRequests();
}
