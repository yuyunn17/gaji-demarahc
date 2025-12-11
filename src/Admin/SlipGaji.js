import React, { useState } from "react";

function SlipGaji() {
  const [bulan, setBulan] = useState("Agustus 2025");
  const [karyawan, setKaryawan] = useState("Semua");

  const dataGaji = [
    { id: 1, nama: "Syardatul Maula", posisi: "Bidan", total: 6759250, status: "Dikirim" },
    { id: 2, nama: "Firda", posisi: "Bidan", total: 8456850, status: "Belum Dikirim" },
    { id: 3, nama: "Filga Tri Adhab", posisi: "Bidan", total: 7321250, status: "Belum Dikirim" },
    { id: 4, nama: "Yuyun Puspitayani H", posisi: "Bidan", total: 5365250, status: "Dikirim" },
  ];

  const filteredData = dataGaji.filter((item) =>
    karyawan === "Semua" ? true : item.nama === karyawan
  );

  const formatRupiah = (angka) =>
    `Rp. ${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  const handleDelete = (id) => {
    // Hindari error ESLint dengan deklarasi lokal confirm
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus slip gaji ini?");
    if (konfirmasi) {
      window.alert(`Slip gaji ID ${id} dihapus`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Slip Gaji</h1>

      {/* Filter */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Bulan/Tahun
          </label>
          <select
            value={bulan}
            onChange={(e) => setBulan(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option>Juli 2025</option>
            <option>Agustus 2025</option>
            <option>September 2025</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">
            Pilih Karyawan
          </label>
          <select
            value={karyawan}
            onChange={(e) => setKaryawan(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option>Semua</option>
            {dataGaji.map((item) => (
              <option key={item.id}>{item.nama}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-sm">
              <th className="px-4 py-2 border">No.</th>
              <th className="px-4 py-2 border">Nama Karyawan</th>
              <th className="px-4 py-2 border">Posisi</th>
              <th className="px-4 py-2 border">Total Gaji</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item.id}
                className="text-center text-gray-800 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2 border">
                  {String(index + 1).padStart(2, "0")}.
                </td>
                <td className="px-4 py-2 border">{item.nama}</td>
                <td className="px-4 py-2 border">{item.posisi}</td>
                <td className="px-4 py-2 border">{formatRupiah(item.total)}</td>
                <td
                  className={`px-4 py-2 border font-semibold ${
                    item.status === "Dikirim" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.status}
                </td>
                <td className="px-4 py-2 border">
                  <button className="text-blue-600 hover:underline mr-2">
                    Detail
                  </button>
                  <button className="text-green-600 hover:underline mr-2">
                    Cetak
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Hapus"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SlipGaji;
