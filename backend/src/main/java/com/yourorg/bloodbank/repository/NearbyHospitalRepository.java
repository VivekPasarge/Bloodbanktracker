package com.yourorg.bloodbank.repository;

import com.yourorg.bloodbank.entity.NearbyHospital;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NearbyHospitalRepository extends JpaRepository<NearbyHospital, Long> {

    List<NearbyHospital> findByCityIgnoreCase(String city);
}