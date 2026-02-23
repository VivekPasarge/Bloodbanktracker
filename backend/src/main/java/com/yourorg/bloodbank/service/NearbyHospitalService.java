package com.yourorg.bloodbank.service;

import com.yourorg.bloodbank.entity.NearbyHospital;
import com.yourorg.bloodbank.repository.NearbyHospitalRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class NearbyHospitalService {

    private final NearbyHospitalRepository repository;

    public NearbyHospitalService(NearbyHospitalRepository repository) {
        this.repository = repository;
    }

    // ================= EXISTING (AUTO-DEDUPE ADDED) =================
    // Used when city is NOT provided
    public List<NearbyHospital> getNearestHospitals(
            double userLat,
            double userLng,
            int limit
    ) {
        List<HospitalWithDistance> nearby = repository.findAll()
                .stream()
                .filter(h -> h.getLatitude() != null && h.getLongitude() != null)
                .map(h -> new HospitalWithDistance(
                        h,
                        distance(userLat, userLng, h.getLatitude(), h.getLongitude())
                ))
                .toList();

        return dedupeAndSort(nearby, limit);
    }

    // ================= CITY + DISTANCE + DEDUPE =================
    public List<NearbyHospital> getNearestHospitalsByCity(
            String city,
            double userLat,
            double userLng,
            int limit
    ) {
        List<HospitalWithDistance> nearby = repository
                .findByCityIgnoreCase(city)
                .stream()
                .filter(h -> h.getLatitude() != null && h.getLongitude() != null)
                .map(h -> new HospitalWithDistance(
                        h,
                        distance(userLat, userLng, h.getLatitude(), h.getLongitude())
                ))
                .toList();

        return dedupeAndSort(nearby, limit);
    }

    // ================= DEDUP + SORT =================
    private List<NearbyHospital> dedupeAndSort(
            List<HospitalWithDistance> hospitals,
            int limit
    ) {
        Map<String, HospitalWithDistance> deduped = new HashMap<>();

        for (HospitalWithDistance hd : hospitals) {
            String key = normalize(hd.hospital.getName())
                    + "|"
                    + normalize(hd.hospital.getCity());

            // keep nearest one
            if (!deduped.containsKey(key)
                    || hd.distance < deduped.get(key).distance) {
                deduped.put(key, hd);
            }
        }

        return deduped.values()
                .stream()
                .sorted(Comparator.comparingDouble(h -> h.distance))
                .limit(limit)
                .map(h -> h.hospital)
                .collect(Collectors.toList());
    }

    // ================= DISTANCE (KM) =================
    private double distance(
            double lat1, double lon1,
            double lat2, double lon2
    ) {
        final int R = 6371;

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(lat1)) *
                Math.cos(Math.toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

        return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    private String normalize(String s) {
        return s == null ? "" : s.trim().toLowerCase();
    }

    // ================= HELPER CLASS =================
    private static class HospitalWithDistance {
        NearbyHospital hospital;
        double distance;

        HospitalWithDistance(NearbyHospital hospital, double distance) {
            this.hospital = hospital;
            this.distance = distance;
        }
    }
}