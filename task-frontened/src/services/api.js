import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082/api",
});


// 🔥 ADD INTERCEPTOR
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
console.log("Token sent",token);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;