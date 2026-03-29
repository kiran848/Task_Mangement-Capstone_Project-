package com.theCapstoneProject.Task_Management.controller;
import com.theCapstoneProject.Task_Management.exception.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.theCapstoneProject.Task_Management.entity.User;
import com.theCapstoneProject.Task_Management.service.UserService;
import com.theCapstoneProject.Task_Management.security.JwtUtil;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {

        User existingUser = userService.findByEmail(user.getEmail());


        if (existingUser == null) {
            throw new UnauthorizedException("Invalid email or password");
        }


        if (!existingUser.getActive()) {
            throw new UnauthorizedException("User account is deactivated");
        }


        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        String token = JwtUtil.generateToken(existingUser.getEmail(), existingUser.getRole());


        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", existingUser.getRole());
        response.put("email", existingUser.getEmail());
        response.put("name", existingUser.getName());

        return ResponseEntity.ok(response);
    }
}