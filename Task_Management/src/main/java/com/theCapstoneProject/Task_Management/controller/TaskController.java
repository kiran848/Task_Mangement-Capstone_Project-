package com.theCapstoneProject.Task_Management.controller;
import com.theCapstoneProject.Task_Management.entity.User;
import com.theCapstoneProject.Task_Management.payload.TaskResponseDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.theCapstoneProject.Task_Management.entity.Task;
import com.theCapstoneProject.Task_Management.service.TaskService;
import com.theCapstoneProject.Task_Management.service.UserService;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")

public class TaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    @PostMapping
    public TaskResponseDto createTask(@Valid @RequestBody Task task){

        String email = (String) SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getPrincipal();

            User user = userService.findByEmail(email);

            task.setCreatedBy(user);

            //  ROLE-BASED ASSIGNMENT
            if (user.getRole().equals("ADMIN")) {

                // Admin can assign to anyone
                if (task.getAssignedTo() != null) {
                    User assignedUser = userService.getUserById(task.getAssignedTo().getId());
                    task.setAssignedTo(assignedUser);
                }

            } else {
                // User can only assign to themselves
                task.setAssignedTo(user);
            }

            Task savedTask = taskService.createTask(task);

            return taskService.convertToDto(savedTask);
        }
    @GetMapping
    public List<TaskResponseDto> getTasks(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long assignedTo
    ) {

        String email = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        User user = userService.findByEmail(email);

        List<Task> tasks;

        // 🔥 STEP 1: Role-based fetch FIRST
        if (user.getRole().equals("ADMIN")) {
            tasks = taskService.getAllTasks();
        } else {
            tasks = taskService.getTasksByUser(user.getId());
        }

        // 🔥 STEP 2: Apply filters AFTER
        if (status != null) {
            tasks = tasks.stream()
                    .filter(t -> t.getStatus().equalsIgnoreCase(status))
                    .toList();
        }

        if (assignedTo != null) {
            tasks = tasks.stream()
                    .filter(t -> t.getAssignedTo() != null &&
                            t.getAssignedTo().getId().equals(assignedTo))
                    .toList();
        }

        return tasks.stream()
                .map(taskService::convertToDto)
                .toList();
    }
    

    @PutMapping("/{id}")
    public TaskResponseDto updateStatus(@PathVariable Long id, @RequestBody Task updatedTask) {

        Task task = taskService.getTaskById(id);
        task.setStatus(updatedTask.getStatus());

        Task updated = taskService.createTask(task);

        return taskService.convertToDto(updated); // ✅
    }
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {

        Task task = taskService.getTaskById(id);

        String email = (String) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        User user = userService.findByEmail(email);

        // Only creator or admin can delete
        if (task.getCreatedBy() == null ||
                (!task.getCreatedBy().getId().equals(user.getId())
                        && !user.getRole().equals("ADMIN"))) {

            throw new RuntimeException("Not authorized to delete this task");
        }

        taskService.deleteTask(id);

        return "Task deleted successfully";
    }
    @GetMapping("/{id}")
    public TaskResponseDto getTask(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        return taskService.convertToDto(task);
    }


}
