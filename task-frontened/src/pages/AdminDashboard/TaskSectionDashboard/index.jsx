import Sidebar from "../../../components/admin/Sidebar";
import Topbar from "../../../components/admin/Topbar";


import CreateTask from "../../../components/admin/CreateTask";
import TaskSection from "../../../components/admin/TaskSection";

export default function TaskPage() {
  return (
    <div>
      <Sidebar />
      <Topbar />

      <div className="main-content">
        <h3>Task Management</h3>

        <CreateTask />
        <TaskSection />
      </div>
    </div>
  );
}