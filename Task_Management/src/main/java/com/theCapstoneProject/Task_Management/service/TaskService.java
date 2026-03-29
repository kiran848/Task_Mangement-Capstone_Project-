package com.theCapstoneProject.Task_Management.service;
import com.theCapstoneProject.Task_Management.exception.ResourceNotFoundException;
import com.theCapstoneProject.Task_Management.payload.TaskResponseDto;
import com.theCapstoneProject.Task_Management.payload.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.theCapstoneProject.Task_Management.entity.Task;
import com.theCapstoneProject.Task_Management.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    public List<Task> getTasksByUser(Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }
    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
    public TaskResponseDto convertToDto(Task task) {

        UserDto assigned = null;

        if (task.getAssignedTo() != null) {
            assigned = new UserDto(
                    task.getAssignedTo().getId(),
                    task.getAssignedTo().getName(),
                    task.getAssignedTo().getEmail(),
                    task.getAssignedTo().getActive(),
                    task.getAssignedTo().getRole()
            );
        }

        UserDto creator = null;

        if (task.getCreatedBy() != null) {
            creator = new UserDto(
                    task.getCreatedBy().getId(),
                    task.getCreatedBy().getName(),
                    task.getCreatedBy().getEmail(),
                    task.getCreatedBy().getActive(),
                    task.getCreatedBy().getRole()
            );
        }

        return new TaskResponseDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                assigned,
                creator
        );
    }
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }

}
