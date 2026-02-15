package com.yourorg.bloodbank.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "deliveries")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Delivery {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pickupAddress;
    private String dropAddress;
    private String contactName;
    private String contactPhone;
    private String status; // PENDING, IN_TRANSIT, DELIVERED
}
