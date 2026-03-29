import API from "./api";

// GET ALL USERS
export const getUsers = () => API.get("/admin/users");

//GET USER BY ID
export const getUserById=(id)=>
    API.get(`admin/users/${id}`);

// ACTIVATE
export const activateUser = (id) =>
  API.put(`admin/users/${id}/activate`);

// DEACTIVATE
export const deactivateUser = (id) =>
  API.put(`admin/users/${id}/deactivate`);

// DELETE
export const deleteUser = (id) =>
  API.delete(`admin/users/${id}`);