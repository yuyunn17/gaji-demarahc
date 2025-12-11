import React from "react";
import SidebarKaryawan from "../components/SidebarKaryawan";

export default function DashboardKaryawan() {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* CONTENT */}
      <div className="ml-64 w-full p-10">

        <h1 className="text-3xl font-bold text-purple-600">
          Welcome to Demara Health Care
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Simplifying Employee Management with Digital Solutions
        </p>

        {/* Kotak tanggal */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <p className="font-semibold">
            Hari ini: Selasa, 22 Juni 2025
          </p>

          <div className="mt-3 space-y-2">
            <div className="h-2 bg-purple-200 rounded"></div>
            <div className="h-2 bg-green-200 rounded"></div>
          </div>
        </div>

        {/* Grafik */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <p className="font-semibold mb-4">Grafik Kehadiran Mingguan</p>

          {/* TARUH CHARTMU DI SINI */}
          <div className="h-64 flex items-center justify-center text-gray-400">
            Grafik di sini
          </div>
        </div>

        {/* Quote */}
        <div className="bg-white p-6 rounded-lg shadow text-center italic text-gray-700">
          “Have a great day at work, stay positive and productive!”
        </div>

      </div>
    </div>
  );
}
