# Task_Mangement-Capstone_Project-
A full-stack task management application built using Spring Boot, React, and MySQL.  
It supports authentication, role-based access (ADMIN / USER), and task tracking.

---

## ⚙️ Tech Stack

Frontend: React + Axios + Bootstrap  
Backend: Spring Boot + Spring Security (JWT)  
Database: MySQL  
DevOps: Docker, Docker Compose, GitHub Actions  

---

## 🚀 Features

- User registration and login (JWT)
- Role-based access (ADMIN / USER)
- Task creation and status updates
- Task filtering by status and assigned user
- Admin can manage users (activate / deactivate / delete)

---

## 🔐 API Endpoints

### Auth
POST /api/auth/register  
POST /api/auth/login  

---

### Tasks
GET /api/tasks  
POST /api/tasks  
GET /api/tasks/{id}  
PUT /api/tasks/{id}  
DELETE /api/tasks/{id}  

---

### Task Filters
GET /api/tasks?status=TODO  
GET /api/tasks?assignedTo=1  
GET /api/tasks?status=IN_PROGRESS&assignedTo=1  

---

### Admin (Users)
GET /api/admin/users  
GET /api/admin/users/{id}  
POST /api/admin/users  
PUT /api/admin/users/{id}/activate  
PUT /api/admin/users/{id}/deactivate  
DELETE /api/admin/users/{id}  

---

## ▶️ Run Locally

Backend:
cd Task_Management  
mvnw.cmd spring-boot:run  

Frontend:
cd task-frontened  
npm install  
npm start  

---

## 🐳 Run with Docker

Build backend:
cd Task_Management  
mvnw.cmd -DskipTests package  
cd ..  

Run project:
docker-compose up --build  

---

## 🌐 Access

Frontend: http://localhost:3000  
Backend: http://localhost:8080  

---

## 🧪 Flow

USER:
- Create tasks (self assigned)
- View only their tasks
- Update task status  

ADMIN:
- View all users
- Activate / deactivate users
- Delete users
- Assign tasks
- View all tasks  

---

## ⚙️ CI/CD

GitHub Actions pipeline:
- Builds backend (Maven)
- Builds frontend (Node)
- Builds Docker images  

---

## 👨‍💻 Author

Kiran
