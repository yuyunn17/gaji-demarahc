import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Admin/Dashboard";
import Karyawan from "./Admin/Karyawan";
import Absensi from "./Admin/Absensi";
import CutiKaryawan from "./Admin/CutiKaryawan";
import Gaji from "./Admin/Gaji";
import SlipGaji from "./Admin/SlipGaji";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Halaman Utama */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/karyawan" element={<Karyawan />} />
            <Route path="/absensi" element={<Absensi />} />
            <Route path="/cutikaryawan" element={<CutiKaryawan />} />
            <Route path="/gaji" element={<Gaji />} />
            <Route path="/slipgaji" element={<SlipGaji />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
