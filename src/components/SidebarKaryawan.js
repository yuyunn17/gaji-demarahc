import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/demaralogo.png"; // sesuaikan path

function SidebarKaryawan() {
  return (
    <aside className="w-64 bg-[#FFE2FE] p-6 min-h-screen">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Logo" className="w-40 h-auto" />
      </div>

      <nav className="mt-8">
        <ul className="space-y-4">

          <li>
            <Link
              to="/dashboard-karyawan"
              className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white"
            >
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/data-diri"
              className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white"
            >
              Data Diri
            </Link>
          </li>

          <li>
            <Link
              to="/absensi-karyawan"
              className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white"
            >
              Absensi
            </Link>
          </li>

          <li>
            <Link
              to="/slip-gaji-karyawan"
              className="block px-3 py-2 rounded-lg hover:bg-[#CC45DE] hover:text-white"
            >
              Slip Gaji
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
}

export default SidebarKaryawan;
