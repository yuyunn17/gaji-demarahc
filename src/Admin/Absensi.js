import React, { useState, useEffect } from "react";

function Absensi() {
  // Data awal
  const defaultAbsensi = [
    {
      id: 1,
      nama: "Syardatul Maula",
      posisi: "Bidan",
      date: "2025-08-13",
      jamMasuk: "07:30",
      jamKeluar: "17:00",
      status: "Hadir",
    },
    {
      id: 2,
      nama: "Ridwan",
      posisi: "Driver",
      date: "2025-08-13",
      jamMasuk: "07:30",
      jamKeluar: "15:30",
      status: "Hadir",
    },
  ];

  const [absensi, setAbsensi] = useState(() => {
    const saved = localStorage.getItem("absensiData");
    return saved ? JSON.parse(saved) : defaultAbsensi;
  });

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    posisi: "",
    date: "",
    jamMasuk: "",
    jamKeluar: "",
    status: "Hadir",
  });

  // Simpan ke localStorage
  useEffect(() => {
    localStorage.setItem("absensiData", JSON.stringify(absensi));
  }, [absensi]);

  // Saat klik Edit
  const handleEdit = (item) => {
    setEditData(item);
    setFormData({
      nama: item.nama,
      posisi: item.posisi,
      date: item.date,
      jamMasuk: item.jamMasuk,
      jamKeluar: item.jamKeluar,
      status: item.status,
    });
    setShowModal(true);
  };

  // Saat klik Tambah
  const handleAdd = () => {
    setEditData(null);
    setFormData({
      nama: "",
      posisi: "",
      date: "",
      jamMasuk: "",
      jamKeluar: "",
      status: "Hadir",
    });
    setShowModal(true);
  };

  // Simpan data (tambah/edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      setAbsensi((prev) =>
        prev.map((a) =>
          a.id === editData.id ? { ...formData, id: editData.id } : a
        )
      );
    } else {
      setAbsensi((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    setShowModal(false);
    setEditData(null);
  };

  // Hapus data
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setAbsensi((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-100">
      {/* Header */}
      <h2 className="text-3xl font-bold text-[#CC45DE] mb-6">Absensi</h2>
      <p className="text-sm text-gray-500 mb-8">📅 &gt; Absensi</p>

      {/* Tabel Absensi */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Daftar Absensi Karyawan
          </h2>
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
          >
            + Tambah Absensi
          </button>
        </div>

        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-3 py-2">Nama</th>
              <th className="border border-gray-300 px-3 py-2">Posisi</th>
              <th className="border border-gray-300 px-3 py-2">Tanggal</th>
              <th className="border border-gray-300 px-3 py-2">Jam Masuk</th>
              <th className="border border-gray-300 px-3 py-2">Jam Keluar</th>
              <th className="border border-gray-300 px-3 py-2">Status</th>
              <th className="border border-gray-300 px-3 py-2 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {absensi.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2">{a.nama}</td>
                <td className="border border-gray-300 px-3 py-2">{a.posisi}</td>
                <td className="border border-gray-300 px-3 py-2">{a.date}</td>
                <td className="border border-gray-300 px-3 py-2">{a.jamMasuk}</td>
                <td className="border border-gray-300 px-3 py-2">{a.jamKeluar}</td>
                <td
                  className={`border border-gray-300 px-3 py-2 ${
                    a.status === "Hadir"
                      ? "text-green-600 font-semibold"
                      : a.status === "Alpha"
                      ? "text-red-600 font-semibold"
                      : "text-yellow-600 font-medium"
                  }`}
                >
                  {a.status}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <button
                    onClick={() => handleEdit(a)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="font-bold mb-3 text-lg">
              {editData ? "Edit Absensi" : "Tambah Absensi"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                placeholder="Nama"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                value={formData.posisi}
                onChange={(e) =>
                  setFormData({ ...formData, posisi: e.target.value })
                }
                placeholder="Posisi"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="time"
                value={formData.jamMasuk}
                onChange={(e) =>
                  setFormData({ ...formData, jamMasuk: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="time"
                value={formData.jamKeluar}
                onChange={(e) =>
                  setFormData({ ...formData, jamKeluar: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                <option value="Hadir">Hadir</option>
                <option value="Izin">Izin</option>
                <option value="Sakit">Sakit</option>
                <option value="Alpha">Alpha</option>
              </select>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Absensi;
