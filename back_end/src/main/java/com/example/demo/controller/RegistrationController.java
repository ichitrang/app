package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")  // MATCH your frontend
public class RegistrationController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (user.getAadhar() == null || user.getAadhar().length() != 12) {
            return "Invalid Aadhar number!";
        }

        userRepository.save(user);
        return "User registered successfully!";
    }
}
