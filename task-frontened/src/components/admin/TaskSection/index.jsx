import { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask } from "../../../services/taskService";
import { getUsers } from "../../../services/userService";

export default function TaskSection() {
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("");
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState([]);

    // ✅ NEW STATES
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ AUTO HIDE MESSAGE
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await getTasks();
            setTasks(res.data);
        } catch {
            setError("Failed to load tasks ❌");
        } finally {
            setLoading(false);
        }
    };

    const filterByStatus = async () => {
        try {
            setLoading(true);
            const res = await getTasks({ status });
            setTasks(res.data);
        } catch {
            setError("Error filtering by status ❌");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res.data);
        } catch {
            setError("Failed to load users ❌");
        }
    };
    const filterByUser = async () => {
    if (!userId) {
        setError("Please select a user ❌");
        return;
    }

    try {
        setLoading(true);
        const res = await getTasks({ assignedTo: userId });
        setTasks(res.data);
    } catch {
        setError("Error filtering by user ❌");
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="card p-3">
            <h5>Task Management</h5>

            {/* ✅ ERROR / SUCCESS */}
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <button
                className="btn btn-primary w-100 mb-2"
                onClick={fetchTasks}
                disabled={loading}
            >
                {loading ? "Loading..." : "Get All Tasks"}
            </button>

            <select
                className="form-control my-2"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">Select Status</option>
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
            </select>

            <button
                className="btn btn-info w-100 mb-2"
                onClick={filterByStatus}
                disabled={loading}
            >
                Filter by Status
            </button>

            <select
                className="form-control my-2"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            >
                <option value="">Select User</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.name}
                    </option>
                ))}
            </select>

            <button
                className="btn btn-dark w-100"
                onClick={filterByUser}
                disabled={loading}
            >
                Filter by User
            </button>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Assigned</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map((t) => (
                        <tr key={t.id}>
                            <td>{t.title}</td>

                            <td>
                                <select
                                    className="form-control"
                                    value={t.status}
                                    onChange={async (e) => {
                                        const newStatus = e.target.value;

                                        try {
                                            setLoading(true);
                                            await updateTask(t.id, { status: newStatus });

                                            setSuccess("Status Updated ✅");
                                            fetchTasks();

                                        } catch (err) {
                                            console.log(err.response?.data);
                                            setError("Error updating status ❌");
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                >
                                    <option value="TODO">TODO</option>
                                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </td>

                            <td>{t.assignedTo?.name || "N/A"}</td>

                            <td>{t.createdBy?.name || "N/A"}</td>

                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    disabled={loading}
                                    onClick={async () => {
                                        try {
                                            setLoading(true);
                                            await deleteTask(t.id);

                                            setSuccess("Task Deleted ✅");
                                            fetchTasks();

                                        } catch {
                                            setError("Delete failed ❌");
                                        } finally {
                                            setLoading(false);
                                        }
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