package com.theCapstoneProject.Task_Management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.theCapstoneProject.Task_Management.entity.User;
import com.theCapstoneProject.Task_Management.payload.UserDto;
import com.theCapstoneProject.Task_Management.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class UserController {

    @Autowired
    private UserService userService;

    //  Get all users
    @GetMapping("/users")
    public List<UserDto> getAllUsers() {

        return userService.getAllUsers()
                .stream()
                .map(user -> new UserDto(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getActive(),
                        user.getRole()
                ))
                .toList();
    }
    //Get user by id
    @GetMapping("/users/{id}")
    public UserDto getUserById(@PathVariable Long id) {

        User user = userService.getUserById(id);

        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getActive(),
                user.getRole()
        );
    }

    //  Create user (Admin)
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userService.register(user);
    }

    // Deactivate user
    @PutMapping("/users/{id}/deactivate")
    public String deactivateUser(@PathVariable Long id) {

        User user = userService.getUserById(id);
        user.setActive(false);

        userService.saveUser(user);

        return "User deactivated successfully";
    }

    // Activate user
    @PutMapping("/users/{id}/activate")
    public String activateUser(@PathVariable Long id) {

        User user = userService.getUserById(id);
        user.setActive(true);

        userService.saveUser(user);

        return "User activated successfully";
    }
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {

        User user = userService.getUserById(id);

        userService.deleteUser(user.getId());

        return "User deleted successfully";
    }
}