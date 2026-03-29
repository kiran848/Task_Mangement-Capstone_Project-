import { useNavigate } from "react-router-dom";
import "./sidebar.css";


export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h4 className="p-3 text-white">Admin Panel</h4>

      <ul className="list-unstyled px-3">

        <li
          className="menu-item"
          onClick={() => navigate("/admin")}
        >
          Dashboard
        </li>

        <li
          className="menu-item"
          onClick={() => navigate("/admin/users")}
        >
          Users
        </li>

        <li
          className="menu-item"
          onClick={() => navigate("/admin/tasks")}
        >
          Tasks
        </li>

      </ul>
    </div>
  );
}