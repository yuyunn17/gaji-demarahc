import { Outlet } from "react-router-dom";
import Sidebar from "../components/SidebarAdmin";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}
