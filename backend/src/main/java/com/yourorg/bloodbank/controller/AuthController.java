package com.yourorg.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import com.yourorg.bloodbank.service.AuthService;
import com.yourorg.bloodbank.entity.User;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
    origins = {
        "http://localhost:5173",
        "http://localhost:5175"
    }
)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Register a new user
     * Body:
     * {
     *   "name": "...",
     *   "email": "...",
     *   "password": "...",
     *   "role": "ROLE_USER"
     * }
     */
    @PostMapping("/register")
    public User register(@RequestBody Map<String, String> body) {
        return authService.register(
                body.get("name"),
                body.get("email"),
                body.get("password"),
                body.getOrDefault("role", "ROLE_USER")
        );
    }

    /**
     * Login
     * Body:
     * {
     *   "email": "...",
     *   "password": "..."
     * }
     *
     * Returns token + user info
     */
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        return authService.login(
                body.get("email"),
                body.get("password")
        ).orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }

    /**
     * TEMPORARY — create admin user
     * REMOVE after use
     */
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
