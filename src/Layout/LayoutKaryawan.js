import SidebarKaryawan from "../components/SidebarKaryawan";
import { Outlet } from "react-router-dom";

export default function LayoutKaryawan() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SidebarKaryawan />

      <div className="ml-64 w-full p-10">
        <Outlet />
      </div>
    </div>
  );
}
