import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./routes/protectedroutes";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/AdminDashboard/TaskSectionDashboard";
import UserPage from "./pages/AdminDashboard/UserSectionDashboard";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>

<Route
  path="/admin"
  element={
    <ProtectedRoute roleRequired="ADMIN">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <ProtectedRoute roleRequired="ADMIN">
      <UserPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/tasks"
  element={
    <ProtectedRoute roleRequired="ADMIN">
      <TaskPage />
    </ProtectedRoute>
  }
/>

        
        <Route
          path="/user"
          element={
            <ProtectedRoute roleRequired="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;