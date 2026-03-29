

import Sidebar from "../../../components/admin/Sidebar";
import Topbar from "../../../components/admin/Topbar";
import UserSection from "../../../components/admin/UserSection";

export default function UserPage() {
  return (
    <div>
      <Sidebar />
      <Topbar />

      <div className="main-content">
        <h3>User Management</h3>
        <UserSection />
      </div>
    </div>
  );
}