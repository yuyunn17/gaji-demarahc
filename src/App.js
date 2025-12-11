import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LayoutAdmin from "./Layout/LayoutAdmin";
import LayoutKaryawan from "./Layout/LayoutKaryawan";

// ADMIN PAGE
import DashboardAdmin from "./Admin/Dashboard";
import Karyawan from "./Admin/Karyawan";
import AbsensiAdmin from "./Admin/Absensi";
import CutiKaryawan from "./Admin/CutiKaryawan";
import Gaji from "./Admin/Gaji";
import SlipGajiAdmin from "./Admin/SlipGaji";
import Treatment from "./Admin/Treatment";

// KARYAWAN PAGE
import DashboardKaryawan from "./Karyawan/DashboardKaryawan";
import DataDiri from "./Karyawan/DataDiri";
import AbsensiKaryawan from "./Karyawan/AbsensiKaryawan";
import SlipGajiKaryawan from "./Karyawan/SlipgajiKaryawan";

function App() {
  return (
    <Router>
      <Routes>

        {/* Redirect root "/" ke /admin/dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* ================= ADMIN ROUTE ================= */}
        <Route path="/admin" element={<LayoutAdmin />}>

          {/* Default halaman admin → /admin/dashboard */}
          <Route index element={<DashboardAdmin />} />

          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="karyawan" element={<Karyawan />} />
          <Route path="absensi" element={<AbsensiAdmin />} />
          <Route path="cuti" element={<CutiKaryawan />} />
          <Route path="gaji" element={<Gaji />} />
          <Route path="slip-gaji" element={<SlipGajiAdmin />} />
          <Route path="treatment" element={<Treatment />} />

        </Route>

        {/* ================= KARYAWAN ROUTE ================= */}
        <Route path="/karyawan" element={<LayoutKaryawan />}>

          {/* default → /karyawan/dashboard */}
          <Route index element={<DashboardKaryawan />} />

          <Route path="dashboard" element={<DashboardKaryawan />} />
          <Route path="datadiri" element={<DataDiri />} />
          <Route path="absensi" element={<AbsensiKaryawan />} />
          <Route path="slipgaji" element={<SlipGajiKaryawan />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
