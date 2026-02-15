package com.yourorg.bloodbank.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "donor_profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DonorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "blood_type")
    private String bloodType;

    private String city;

    private String phone;

    private boolean available;
}
