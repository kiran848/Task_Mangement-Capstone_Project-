import { useState, useEffect } from "react";
import {
    getUsers,
    getUserById,
    activateUser,
    deactivateUser,
    deleteUser,
} from "../../../services/userService";

export default function UserSection() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // NEW STATES
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // AUTO HIDE
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await getUsers();
            setUsers(res.data);
        } catch {
            setError("Failed to load users ❌");
        } finally {
            setLoading(false);
        }
    };

    const fetchUserById = async () => {
        if (!selectedUserId) {
            setError("Please select a user ❌");
            return;
        }

        try {
            setLoading(true);

            const res = await getUserById(Number(selectedUserId));

            setUsers([res.data]);
            setSuccess("User fetched successfully ✅");

        } catch (err) {
            setUsers([]);
            setError("User not found ❌");
        } finally {
            setLoading(false);
        }
    };

    const handleActivate = async () => {
        if (!selectedUserId) return setError("Select user ❌");

        try {
            setLoading(true);
            await activateUser(selectedUserId);
            setSuccess("User Activated ✅");
            fetchUsers();
        } catch {
            setError("Activation failed ❌");
        } finally {
            setLoading(false);
        }
    };

    const handleDeactivate = async () => {
        if (!selectedUserId) return setError("Select user ❌");

        try {
            setLoading(true);
            await deactivateUser(selectedUserId);
            setSuccess("User Deactivated ⚠️");
            fetchUsers();
        } catch {
            setError("Deactivation failed ❌");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedUserId) return setError("Select user ❌");

        try {
            setLoading(true);
            await deleteUser(selectedUserId);
            setSuccess("User Deleted 🗑️");
            fetchUsers();
        } catch {
            setError("Delete failed ❌");
        } finally {
            setLoading(false);
        }
    };
    const filteredUsers = users.filter((u) => {
        return (
            (roleFilter ? u.role === roleFilter : true) &&
            (statusFilter ? String(u.active) === statusFilter : true)
        );
    });

    return (
        <div className="card p-3 mb-4">
            <h5>User Management</h5>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <button
                className="btn btn-primary w-100 mb-2"
                onClick={fetchUsers}
                disabled={loading}
            >
                {loading ? "Loading..." : "Get All Users"}
            </button>

            <select
                className="form-control my-2"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
            >
                <option value="">Select User</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.name} ({u.email})
                    </option>
                ))}
            </select>

            <div className="mb-2">
                <button
                    className="btn btn-info me-2"
                    onClick={fetchUserById}
                    disabled={loading}
                >
                    Get User By ID
                </button>

                <button
                    className="btn btn-success me-2"
                    onClick={handleActivate}
                    disabled={loading}
                >
                    Activate
                </button>

                <button
                    className="btn btn-warning me-2"
                    onClick={handleDeactivate}
                    disabled={loading}
                >
                    Deactivate
                </button>

                <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    Delete
                </button>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <select
                        className="form-control"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>

                <div className="col">
                    <select
                        className="form-control"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
            </div>


            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>

                            <td>
                                <span className={`badge ${u.role === "ADMIN" ? "bg-danger" : "bg-primary"}`}>
                                    {u.role}
                                </span>
                            </td>

                            <td>
                                <span className={`badge ${u.active ? "bg-success" : "bg-secondary"}`}>
                                    {u.active ? "Active" : "Inactive"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}