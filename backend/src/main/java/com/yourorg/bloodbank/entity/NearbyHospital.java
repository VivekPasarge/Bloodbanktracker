package com.yourorg.bloodbank.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "nearby_hospitals")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class NearbyHospital {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private String city;
    private double latitude;
    private double longitude;
    private String phone;
}
