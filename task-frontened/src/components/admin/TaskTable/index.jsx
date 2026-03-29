import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../../../services/taskService";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  return (
    <div className="card p-3">
      <h5>Tasks</h5>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Assigned</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>

              <td>
                <span className="badge bg-info">{t.status}</span>
              </td>

              <td>{t.assignedTo?.name || "None"}</td>

              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    deleteTask(t.id);
                    fetchTasks();
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