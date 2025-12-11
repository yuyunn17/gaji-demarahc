import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/demaralogo.png";

function SidebarAdmin() {
  return (
    <aside className="w-64 bg-[#FFE2FE] p-6 min-h-screen">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-40 h-auto" />
      </div>
      <nav className="mt-8">
        <ul className="space-y-4">

          <li>
            <Link to="/admin/dashboard" className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/karyawan" className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white">
              Karyawan
            </Link>
          </li>

          <li>
            <Link to="/admin/absensi" className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white">
              Absensi
            </Link>
          </li>

          <li>
            <Link to="/admin/cuti" className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white">
              Cuti Karyawan
            </Link>
          </li>

          <li>
            <Link to="/admin/gaji" className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white">
              Gaji
            </Link>
          </li>

          <li>
            <Link to="/admin/slip-gaji" className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white">
              Slip Gaji
            </Link>
          </li>

          <li>
            <Link to="/admin/treatment" className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white">
              Kelola Treatment
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
}

export default SidebarAdmin;
