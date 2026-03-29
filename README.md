# 🗂️ Task Management System

A full-stack task management application built using **Spring Boot, React, and MySQL**.  
The system allows users to manage tasks efficiently with **role-based access control (ADMIN / USER)**, secure authentication, and filtering capabilities.

---

## 📌 Overview

This project is designed to demonstrate:
- Full-stack development (Frontend + Backend + Database)
- Secure authentication using JWT
- Role-based authorization
- REST API design
- Docker-based deployment
- CI/CD pipeline integration

---

## ⚙️ Tech Stack

### 🔹 Frontend
- React (Create React App)
- Axios (API calls)
- Bootstrap (UI)

### 🔹 Backend
- Spring Boot
- Spring Security (JWT Authentication)
- Spring Data JPA (Hibernate)

### 🔹 Database
- MySQL

### 🔹 DevOps
- Docker
- Docker Compose
- GitHub Actions (CI/CD)

---

## 🚀 Key Features

### 🔐 Authentication
- User registration and login
- Password encryption using BCrypt
- JWT token generation and validation
- Protected routes in frontend

---

### 👤 User Role
- Create tasks (auto-assigned to self)
- View only their tasks
- Update task status
- Filter tasks by status

---

### 🛠️ Admin Role
- View all users
- Activate / deactivate users
- Delete users
- Create and assign tasks to any user
- View all tasks
- Filter tasks by user and status
- Delete tasks

---

### 📊 Task Management
- Task status workflow:
  - TODO
  - IN_PROGRESS
  - DONE
- Real-time status updates
- Filtering support

---

## 🔐 API Endpoints

### 🔹 Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

---

### 🔹 Tasks
- `GET /api/tasks` → Get tasks (role-based)
- `POST /api/tasks` → Create task
- `GET /api/tasks/{id}` → Get task by ID
- `PUT /api/tasks/{id}` → Update status
- `DELETE /api/tasks/{id}` → Delete task

---

### 🔹 Task Filters
- `GET /api/tasks?status=TODO`
- `GET /api/tasks?assignedTo=1`
- `GET /api/tasks?status=IN_PROGRESS&assignedTo=1`


---

### 🔹 Admin - User Management
- `GET /api/admin/users`
- `GET /api/admin/users/{id}`
- `POST /api/admin/users`
- `PUT /api/admin/users/{id}/activate`
- `PUT /api/admin/users/{id}/deactivate`
- `DELETE /api/admin/users/{id}`

---

## 🧠 Application Flow

### 🔑 1. Authentication
- User registers and logs in
- JWT token is generated and stored in frontend
- User is redirected based on role

---

### 👤 2. User Flow
- User creates tasks (self-assigned)
- Can only view their own tasks
- Updates task status
- Applies filters

---

### 🛠️ 3. Admin Flow
- Admin manages users
- Assigns tasks
- Views all tasks
- Applies filters
- Deletes tasks/users

---

### 🔒 4. Security
- Unauthorized users cannot access protected APIs
- Deactivated users cannot log in
- Role-based access enforced in backend

---

## ▶️ Run Locally

### 🔹 Backend
cd Task_Management
mvnw.cmd spring-boot:run

Runs at: http://localhost:8080

---

### 🔹 Frontend
