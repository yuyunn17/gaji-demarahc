import React, { useState } from "react";

function CutiKaryawan() {
  const [dataCuti, setDataCuti] = useState([
    { id: 1, nama: "Siti Rahma", tanggal: "2025-11-10", lama: 3, alasan: "Acara keluarga", status: "Pending" },
    { id: 2, nama: "Budi Santoso", tanggal: "2025-11-15", lama: 2, alasan: "Sakit", status: "Pending" },
    { id: 3, nama: "Dewi Lestari", tanggal: "2025-11-20", lama: 1, alasan: "Keperluan pribadi", status: "Disetujui" },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCuti, setSelectedCuti] = useState(null);
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    tanggal: "",
    lama: "",
    alasan: "",
    status: "Pending",
  });

  // filter status
  const filteredData = dataCuti.filter(
    (item) => filterStatus === "all" || item.status === filterStatus
  );

  // ubah status
  const ubahStatus = (statusBaru) => {
    setDataCuti((prevData) =>
      prevData.map((item) =>
        item.id === selectedCuti.id ? { ...item, status: statusBaru } : item
      )
    );
    setSelectedCuti(null);
  };

  // tambah data cuti
  const handleTambahCuti = (e) => {
    e.preventDefault();
    const newCuti = {
      id: dataCuti.length + 1,
      ...formData,
    };
    setDataCuti([...dataCuti, newCuti]);
    setFormData({ nama: "", tanggal: "", lama: "", alasan: "", status: "Pending" });
    setShowTambahModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-[#CC45DE] mb-2">Cuti Karyawan</h2>
        <p className="text-sm text-gray-500 mb-8">🏠 &gt; Cuti Karyawan</p>

        {/* Card utama */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Daftar Pengajuan Cuti Karyawan
            </h3>

            <div className="flex items-center gap-3">
              <select
                className="border rounded-md px-3 py-2 text-sm shadow-sm focus:ring focus:ring-pink-200"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="Pending">Pending</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Ditolak">Ditolak</option>
              </select>

              <button
                onClick={() => setShowTambahModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
              >
                + Tambah Cuti
              </button>
            </div>
          </div>

          {/* Tabel cuti */}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-center">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border px-3 py-2">No</th>
                  <th className="border px-3 py-2">Nama Karyawan</th>
                  <th className="border px-3 py-2">Tanggal Cuti</th>
                  <th className="border px-3 py-2">Lama (hari)</th>
                  <th className="border px-3 py-2">Alasan</th>
                  <th className="border px-3 py-2">Status</th>
                  <th className="border px-3 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{index + 1}</td>
                    <td className="border px-3 py-2">{item.nama}</td>
                    <td className="border px-3 py-2">{item.tanggal}</td>
                    <td className="border px-3 py-2">{item.lama}</td>
                    <td className="border px-3 py-2">{item.alasan}</td>
                    <td className="border px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          item.status === "Disetujui"
                            ? "bg-green-200 text-green-800"
                            : item.status === "Ditolak"
                            ? "bg-red-200 text-red-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="border px-3 py-2">
                      <button
                        onClick={() => setSelectedCuti(item)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Detail */}
        {selectedCuti && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h4 className="text-lg font-semibold mb-4 text-center text-gray-700">
                Detail Pengajuan Cuti
              </h4>
              <p><strong>Nama:</strong> {selectedCuti.nama}</p>
              <p><strong>Tanggal Cuti:</strong> {selectedCuti.tanggal}</p>
              <p><strong>Lama:</strong> {selectedCuti.lama} hari</p>
              <p><strong>Alasan:</strong> {selectedCuti.alasan}</p>
              <p><strong>Status:</strong> {selectedCuti.status}</p>

              {selectedCuti.status === "Pending" && (
                <div className="flex justify-between mt-5">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => ubahStatus("Disetujui")}
                  >
                    Setujui
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => ubahStatus("Ditolak")}
                  >
                    Tolak
                  </button>
                </div>
              )}

              <div className="text-center mt-5">
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setSelectedCuti(null)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Tambah Cuti */}
        {showTambahModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h4 className="text-lg font-semibold mb-4 text-center text-gray-700">
                Tambah Pengajuan Cuti
              </h4>
              <form onSubmit={handleTambahCuti} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium">Nama</label>
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                    className="w-full border rounded px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Tanggal Cuti</label>
                  <input
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    required
                    className="w-full border rounded px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Lama (hari)</label>
                  <input
                    type="number"
                    value={formData.lama}
                    onChange={(e) => setFormData({ ...formData, lama: e.target.value })}
                    required
                    className="w-full border rounded px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Alasan</label>
                  <textarea
                    value={formData.alasan}
                    onChange={(e) => setFormData({ ...formData, alasan: e.target.value })}
                    required
                    className="w-full border rounded px-3 py-2 mt-1 focus:ring focus:ring-pink-200"
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTambahModal(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CutiKaryawan;
