package com.example.userservice.service;

import com.example.userservice.data.User;
import com.example.userservice.repo.UserRepo;
import com.example.userservice.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepo.findById(id);
    }

    public User createUser(User user) {
        // Hash the password before saving it to the database
        user.setPassword(hashPassword(user.getPassword()));
        return userRepo.save(user);
    }

    public LoginResponse validateLogin(String email, String password) {
        User user = userRepo.findByEmail(email);
        String message = "No User Found!";
        boolean status = false;
        LoginResponse loginResponse = new LoginResponse(null, message, status);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            loginResponse.setUserId(user.getId());
            loginResponse.setMessage("Login success!");
            loginResponse.setStatus(true);
        } else {
            loginResponse.setMessage("Login Failed!");
            loginResponse.setStatus(false);
        }
        return loginResponse;
    }

    private String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    // Other CRUD operations (update and delete) can be added as needed.
}
