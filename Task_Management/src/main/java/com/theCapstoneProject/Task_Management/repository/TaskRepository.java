package com.theCapstoneProject.Task_Management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.theCapstoneProject.Task_Management.entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByAssignedToId(Long userId);
    List<Task> findByStatus(String status);

}
