import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <h4 className="text-white">Dashboard</h4>
      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}