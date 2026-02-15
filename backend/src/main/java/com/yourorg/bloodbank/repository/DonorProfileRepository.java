package com.yourorg.bloodbank.repository;

import com.yourorg.bloodbank.entity.DonorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DonorProfileRepository extends JpaRepository<DonorProfile, Long>
{
    List<DonorProfile> findByCity(String city);
}
