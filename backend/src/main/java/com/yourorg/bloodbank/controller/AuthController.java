package com.yourorg.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import com.yourorg.bloodbank.service.AuthService;
import com.yourorg.bloodbank.entity.User;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    /**
     * Register a new user.
     * Expected JSON body: { "name": "...", "email": "...", "password": "...", "role": "ROLE_DONOR" }
     */
    @PostMapping("/register")
    public User register(@RequestBody Map<String,String> body){
        return authService.register(
                body.get("name"),
                body.get("email"),
                body.get("password"),
                body.getOrDefault("role","ROLE_USER")

        );
    }

    /**
     * Login endpoint.
     * Expected JSON body: { "email": "...", "password": "..." }
     * Returns a simple map with id, name, email, token and role on success.
     */
    @PostMapping("/login")
public Map<String, Object> login(@RequestBody Map<String, String> body) {
    return authService.login(body.get("email"), body.get("password"))
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));
}
// TEMPORARY: create admin (use once, then delete)
@PostMapping("/create-admin")
public User createAdmin(@RequestBody Map<String, String> body) {
    return authService.register(
        body.get("name"),
        body.get("email"),
        body.get("password"),
        "ROLE_ADMIN"
    );
}

}
