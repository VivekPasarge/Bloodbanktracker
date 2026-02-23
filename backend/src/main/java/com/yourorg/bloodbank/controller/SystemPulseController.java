package com.yourorg.bloodbank.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/system")
public class SystemPulseController {

    @GetMapping("/pulse")
    public Map<String, Object> pulse() {
        Map<String, Object> response = new HashMap<>();

        response.put("status", "ALIVE");
        response.put("serverTime", System.currentTimeMillis());

        return response;
    }
}

