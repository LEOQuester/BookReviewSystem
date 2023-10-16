package com.example.userservice.controller;

import com.example.userservice.data.User;
import com.example.userservice.dto.UserDTO;
import com.example.userservice.exception.ResourceNotFoundException;
import com.example.userservice.response.LoginResponse;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody UserDTO userDTO) {
        return userService.validateLogin(userDTO.getEmail(), userDTO.getPassword());
    }

}
