package com.theCapstoneProject.Task_Management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.theCapstoneProject.Task_Management.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}