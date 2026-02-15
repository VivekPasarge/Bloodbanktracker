package com.yourorg.bloodbank.service;

import org.springframework.stereotype.Service;
import com.yourorg.bloodbank.repository.UserRepository;
import com.yourorg.bloodbank.entity.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Optional;
import com.yourorg.bloodbank.security.JwtUtils;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    public User register(String name, String email, String rawPassword, String role) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(rawPassword))
                .role(role)
                .build();

        return userRepository.save(user);
    }

    public Optional<Map<String, Object>> login(String email, String rawPassword) {
        Optional<User> ou = userRepository.findByEmail(email);

        if (ou.isPresent() && passwordEncoder.matches(rawPassword, ou.get().getPassword())) {
            User u = ou.get();

            String token = jwtUtils.generateToken(u.getEmail(), u.getRole());

            return Optional.of(Map.of(
                    "id", u.getId(),
                    "name", u.getName(),
                    "email", u.getEmail(),
                    "role", u.getRole(),
                    "token", token
            ));
        }

        return Optional.empty();
    }
}
