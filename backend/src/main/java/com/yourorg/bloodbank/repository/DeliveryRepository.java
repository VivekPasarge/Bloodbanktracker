package com.yourorg.bloodbank.repository;

import com.yourorg.bloodbank.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
}
