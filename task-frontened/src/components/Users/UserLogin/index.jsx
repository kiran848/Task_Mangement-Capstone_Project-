import React, { useEffect, useState } from "react";
import {
  getTasks,
  updateTask,
  createTask,
} from "../../../services/taskService";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "TODO",
  });

  //  NEW STATES
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  //  AUTO HIDE
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  //  Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch {
      setError("Error loading tasks ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  //  Create task
  const handleCreate = async () => {
    setError("");
    setSuccess("");

    if (!taskData.title) {
      setError("Title required ❌");
      return;
    }

    try {
      setLoading(true);

      await createTask(taskData);

      setSuccess("Task Created ✅");

      setTaskData({
        title: "",
        description: "",
        status: "TODO",
      });

      fetchTasks();
    } catch {
      setError("Error creating task ❌");
    } finally {
      setLoading(false);
    }
  };

  //  Update status
  const handleStatusChange = async (id, status) => {
    try {
      setLoading(true);

      await updateTask(id, { status });

      setSuccess("Status Updated ✅");

      fetchTasks();
    } catch {
      setError("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  //  Filter
  const filteredTasks = filter
    ? tasks.filter((t) => t.status === filter)
    : tasks;

  return (
    <div className="container mt-4">
      <h2>User Dashboard 👤</h2>

     
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

     
      <div className="card p-3 mb-4">
        <h5>Create Task</h5>

        <input
          className="form-control my-2"
          placeholder="Title"
          value={taskData.title}
          onChange={(e) =>
            setTaskData({ ...taskData, title: e.target.value })
          }
        />

        <input
          className="form-control my-2"
          placeholder="Description"
          value={taskData.description}
          onChange={(e) =>
            setTaskData({ ...taskData, description: e.target.value })
          }
        />

        <select
          className="form-control my-2"
          value={taskData.status}
          onChange={(e) =>
            setTaskData({ ...taskData, status: e.target.value })
          }
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <button
          className="btn btn-danger mt-2"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </div>

      
      <div className="mb-3">
        <select
          className="form-control"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Tasks</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>

      
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Created By</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>

              <td>
                <select
                  value={t.status}
                  onChange={(e) =>
                    handleStatusChange(t.id, e.target.value)
                  }
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </td>

              <td>{t.createdBy?.name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}