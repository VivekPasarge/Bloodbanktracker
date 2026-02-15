package com.yourorg.bloodbank.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "blood_inventory")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BloodInventory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String bloodType;
    private Integer units;
}
