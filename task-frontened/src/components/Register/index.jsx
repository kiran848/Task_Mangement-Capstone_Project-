import React, { useState, useEffect } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ AUTO HIDE
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!data.name || !data.email || !data.password) {
      setError("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", data);

      setSuccess("Registered Successfully ✅");

      // delay for better UX
      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="text-center mb-4">Register</h3>

        {/* ✅ ERROR / SUCCESS */}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <input
          className="form-control my-2"
          placeholder="Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

        <input
          className="form-control my-2"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          className="form-control my-2"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <select
          className="form-control my-2"
          value={data.role}
          onChange={(e) =>
            setData({ ...data, role: e.target.value })
          }
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          className="btn btn-danger w-100 mt-3"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            className="link-red"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}