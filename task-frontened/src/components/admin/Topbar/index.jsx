import { useNavigate } from "react-router-dom";
import "./style.css";
export default function Topbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="topbar">
      <h5>Welcome Admin 👑</h5>

      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </div>
  );
}