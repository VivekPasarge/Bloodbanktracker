package com.yourorg.bloodbank.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "blood_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bloodType;
    private Integer units;

    // optional: link to hospital (if you have NearbyHospital entity)
    private Long hospitalId;

    @Column(length = 1000)
    private String notes;

    @Column(nullable = false)
    private String status; // e.g. OPEN, FULFILLED, CANCELLED

    // who requested — optional, store user id if you want
    private Long requestedByUserId;
}
