import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  // data default absensi
  const defaultAbsensi = [
    { id: 1, nama: "Syardatul Maula", tanggal: "25 Agustus 2025", status: "Menunggu" },
    { id: 2, nama: "Firda", tanggal: "25 Agustus 2025", status: "Menunggu" },
    { id: 3, nama: "Mela Anjasari", tanggal: "25 Agustus 2025", status: "Menunggu" },
    { id: 4, nama: "Yuyun Puspitayani Harahap", tanggal: "25 Agustus 2025", status: "Menunggu" },
    { id: 5, nama: "Ridwan", tanggal: "25 Agustus 2025", status: "Menunggu" },
    { id: 6, nama: "Filga Tri Adhab", tanggal: "25 Agustus 2025", status: "Menunggu" },
  ];

  const [absensi, setAbsensi] = useState(() => {
    const saved = localStorage.getItem("absensi");
    return saved ? JSON.parse(saved) : defaultAbsensi;
  });

  useEffect(() => {
    localStorage.setItem("absensi", JSON.stringify(absensi));
  }, [absensi]);

  const updateStatus = (index, status) => {
    const newAbsensi = [...absensi];
    newAbsensi[index].status = status;
    setAbsensi(newAbsensi);
  };

  const pendingCount = absensi.filter(a => a.status === "Menunggu").length;

  // Chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Total Gaji (Rp)",
        data: [5000000, 7000000, 6000000, 8000000, 9000000, 10000000],
        backgroundColor: "#EAA4E8",
        borderColor: "#FFE2FE",
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 60,
        maxBarThickness: 70,
      },
    ],
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-[#CC45DE] mb-6">Dashboard</h2>
      <p className="text-sm text-gray-500 mb-8">🏠 &gt; Dashboard</p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold text-gray-700">Total Karyawan</h2>
          <p className="text-2xl font-bold text-black mt-3">6</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold text-gray-700">Total Gaji Bulan Ini</h2>
          <p className="text-2xl font-bold text-black mt-3">Rp 50.000.000</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold text-gray-700">Pending Approval</h2>
          <p className="text-2xl font-bold text-black mt-3">{pendingCount}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Grafik Pengeluaran Gaji Per Bulan</h2>
        <div className="h-72">
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Approve Absensi */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Approve Absensi</h2>
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-4 py-2 text-left">Nama Karyawan</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Tanggal</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {absensi.map((a, i) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{a.nama}</td>
                <td className="border border-gray-300 px-4 py-2">{a.tanggal}</td>
                <td className={`border border-gray-300 px-4 py-2 ${
                  a.status === "Menunggu" ? "text-yellow-600 font-medium" :
                  a.status === "Disetujui" ? "text-green-600 font-semibold" :
                  "text-red-600 font-semibold"
                }`}>
                  {a.status}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {a.status === "Menunggu" ? (
                    <>
                      <button
                        onClick={() => updateStatus(i, "Disetujui")}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(i, "Ditolak")}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        Tolak
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => updateStatus(i, "Menunggu")}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
