package com.example.userservice.repo;

import com.example.userservice.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    // Custom query methods can be defined here if needed.

    //User findByUsername(String username);

    User findByEmail(String email);

    // Other query methods...

}
