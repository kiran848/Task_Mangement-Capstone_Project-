package com.theCapstoneProject.Task_Management.payload;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private Boolean active;
    private String role;


}