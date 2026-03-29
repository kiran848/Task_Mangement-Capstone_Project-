import React from "react";
import { useNavigate } from "react-router-dom";

export default function PublicNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleNavigation = (path) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow px-4">
      <h4 className="navbar-brand  text-white">TaskManager</h4>

      <div className="ms-auto">
        <button className="btn btn-link"
          onClick={() => navigate("/")}>
          Home
        </button>

        <button className="btn btn-link"
          onClick={() => handleNavigation("/admin")}>
          Dashboard
        </button>

        {!token && (
          <>
            <button className="btn btn-link"
              onClick={() => navigate("/login")}>
              Login
            </button>

            <button className="btn btn-link"
              onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}