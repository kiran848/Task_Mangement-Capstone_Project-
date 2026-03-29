import { useState, useEffect } from "react";
import { createTask } from "../../../services/taskService";
import { getUsers } from "../../../services/userService";

export default function CreateTask({ refresh }) {
  const [users, setUsers] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    assignedTo: { id: "" },
  });

  // ✅ NEW STATES
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (error || success) {
    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [error, success]);


  // 🔥 Load users for dropdown
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      setError("Failed to load users ❌");
    }
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!task.title || !task.assignedTo.id) {
      setError("Please fill all required fields ❌");
      return;
    }

    try {
      setLoading(true);

      await createTask({
        ...task,
        assignedTo: { id: Number(task.assignedTo.id) },
      });

      setSuccess("Task Created Successfully ✅");

      // 🔥 reset form
      setTask({
        title: "",
        description: "",
        status: "TODO",
        assignedTo: { id: "" },
      });

      if (typeof refresh === "function") refresh();

    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Error creating task ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mb-4">
      <h5>Create Task</h5>

      {/* 🔥 ERROR / SUCCESS UI */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* TITLE */}
      <input
        className="form-control my-2"
        placeholder="Title"
        value={task.title}
        onChange={(e) =>
          setTask({ ...task, title: e.target.value })
        }
      />

      {/* DESCRIPTION */}
      <input
        className="form-control my-2"
        placeholder="Description"
        value={task.description}
        onChange={(e) =>
          setTask({ ...task, description: e.target.value })
        }
      />

      {/* STATUS */}
      <select
        className="form-control my-2"
        value={task.status}
        onChange={(e) =>
          setTask({ ...task, status: e.target.value })
        }
      >
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      {/* USER DROPDOWN */}
      <select
        className="form-control my-2"
        value={task.assignedTo.id}
        onChange={(e) =>
          setTask({
            ...task,
            assignedTo: { id: e.target.value },
          })
        }
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      {/* BUTTON */}
      <button
        className="btn btn-danger mt-2"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </div>
  );
}