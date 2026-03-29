package com.theCapstoneProject.Task_Management.payload;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponseDto {

    private Long id;
    private String title;
    private String description;
    private String status;

    private UserDto assignedTo;
    private UserDto createdBy;
}
