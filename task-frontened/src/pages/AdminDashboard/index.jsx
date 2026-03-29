import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import UserTable from "../../components/admin/UserTable";
import TaskTable from "../../components/admin/TaskTable";
import CreateTask from "../../components/admin/CreateTask";


export default function AdminDashboard() {
  
  return (
    <div>
      <Sidebar />
      <Topbar />

      <div className="main-content">
        <h3 className="mb-3">Dashboard Overview</h3>
        <CreateTask/>
       

        <UserTable />
        <TaskTable />
      </div>
    </div>
  );
}