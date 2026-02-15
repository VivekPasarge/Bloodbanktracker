package com.yourorg.bloodbank.controller;

import org.springframework.web.bind.annotation.*;
import com.yourorg.bloodbank.repository.UserRepository;
import com.yourorg.bloodbank.entity.User;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserRepository userRepository;
    public UserController(UserRepository userRepository){ this.userRepository = userRepository; }

    @GetMapping
    public List<User> list(){ return userRepository.findAll(); }
}
