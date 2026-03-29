import { useEffect, useState } from "react";
import {
  getUsers,
  activateUser,
  deactivateUser,
  deleteUser,
} from "../../../services/userService";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  return (
    <div className="card p-3 mb-4">
      <h5>Users</h5>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>

              <td>
                <span className={`badge ${u.active ? "bg-success" : "bg-danger"}`}>
                  {u.active ? "Active" : "Inactive"}
                </span>
              </td>

              <td>
                {u.active ? (
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      deactivateUser(u.id);
                      fetchUsers();
                    }}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => {
                      activateUser(u.id);
                      fetchUsers();
                    }}
                  >
                    Activate
                  </button>
                )}

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    deleteUser(u.id);
                    fetchUsers();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}