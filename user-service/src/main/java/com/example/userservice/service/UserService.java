package com.example.userservice.service;

import com.example.userservice.data.User;
import com.example.userservice.repo.UserRepo;
import com.example.userservice.response.LoginResponse;
import com.example.userservice.response.RegisterResponse;
import com.example.userservice.response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserResponse getUserById(Long id) {
        UserResponse userResponse = new UserResponse();
        Optional<User> userOptional = userRepo.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userResponse.setUserId(user.getId());
            userResponse.setUserName(user.getUsername());
            userResponse.setEmail(user.getEmail());
        }

        return userResponse;
    }


    public RegisterResponse createUser(User user) {
        // Check if a user with the same email already exists
        User existingUser = userRepo.findByEmail(user.getEmail());

        if (existingUser != null) {
            // User with the same email already exists
            return new RegisterResponse("Email Already Exists", false);
        } else {
            // Hash the password before saving it to the database
            user.setPassword(hashPassword(user.getPassword()));
            userRepo.save(user);
            return new RegisterResponse("Registration Done!", true);
        }
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

    public LoginResponse validateAccess(Long id, String password) {
        Optional<User> userOptional = userRepo.findById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (passwordEncoder.matches(password, user.getPassword())) {
                return new LoginResponse(user.getId(), "valid", true);
            } else {
                return new LoginResponse(null, "Invalid", false);
            }
        } else {
            return new LoginResponse(null, "No User", false);
        }
    }


    private String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    // Other CRUD operations (update and delete) can be added as needed.
}
