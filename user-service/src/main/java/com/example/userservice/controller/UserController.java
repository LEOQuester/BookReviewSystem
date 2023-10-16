package com.example.userservice.controller;

import com.example.userservice.data.User;
import com.example.userservice.dto.UserDTO;
import com.example.userservice.response.LoginResponse;
import com.example.userservice.response.RegisterResponse;
import com.example.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public RegisterResponse createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody UserDTO userDTO) {
        return userService.validateLogin(userDTO.getEmail(), userDTO.getPassword());
    }

    @PostMapping("/validate")
    public LoginResponse validateAccess(@RequestBody UserDTO userDTO) {
        return userService.validateAccess(userDTO.getId(), userDTO.getPassword());
    }

}
