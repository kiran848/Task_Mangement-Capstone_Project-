import API from "./api";

// GET ALL TASKS
export const getTasks = (params) => API.get("/tasks",{params});

// DELETE TASK
export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);

//CREATE TASK
export const createTask=(data)=>{
    API.post("/tasks",data);
}
//Update task
export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);