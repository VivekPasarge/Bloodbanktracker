package com.yourorg.bloodbank.service;

import com.yourorg.bloodbank.entity.NearbyHospital;
import com.yourorg.bloodbank.repository.NearbyHospitalRepository;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class HospitalCsvService {

    private final NearbyHospitalRepository repo;

    public HospitalCsvService(NearbyHospitalRepository repo) {
        this.repo = repo;
    }

    public void importCsv() {
        try {
            var resource = new ClassPathResource("data/hospitals.csv");
            var reader = new BufferedReader(
                    new InputStreamReader(resource.getInputStream())
            );

            String line;
            boolean skipHeader = true;

            while ((line = reader.readLine()) != null) {
                if (skipHeader) {
                    skipHeader = false;
                    continue;
                }

                String[] data = line.split(",");

                NearbyHospital h = new NearbyHospital();
                h.setName(data[0]);
                h.setAddress(data[1]);
                h.setCity(data[2]);
                h.setPhone(data[3]);
                h.setLatitude(Double.parseDouble(data[4]));
                h.setLongitude(Double.parseDouble(data[5]));

                repo.save(h);
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to import CSV", e);
        }
    }
}