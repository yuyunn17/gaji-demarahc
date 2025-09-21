import React, { useState } from "react";

const Absensi = () => {
  const [absensi, setAbsensi] = useState([]);

  const handleAbsenMasuk = (nama, posisi) => {
    const newAbsen = {
      nama,
      posisi,
      date: new Date().toLocaleDateString("id-ID"),
      jamMasuk: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      jamKeluar: "-",
      status: "Hadir",
    };
    setAbsensi([...absensi, newAbsen]);
  };

  const handleAbsenKeluar = (index) => {
    const update = [...absensi];
    update[index].jamKeluar = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    setAbsensi(update);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Absensi Karyawan</h2>

      {/* Form Absen */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="font-semibold mb-2">Form Absen</h3>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => handleAbsenMasuk("Firda", "Bidan")}
        >
          Absen Masuk (Firda - Bidan)
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleAbsenMasuk("Ridwan", "Driver")}
        >
          Absen Masuk (Ridwan - Driver)
        </button>
      </div>

      {/* Tabel Absensi */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama</th>
            <th className="border p-2">Posisi</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Jam Masuk</th>
            <th className="border p-2">Jam Keluar</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {absensi.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{item.nama}</td>
              <td className="border p-2">{item.posisi}</td>
              <td className="border p-2">{item.date}</td>
              <td className="border p-2">{item.jamMasuk}</td>
              <td className="border p-2">{item.jamKeluar}</td>
              <td className="border p-2">{item.status}</td>
              <td className="border p-2">
                {item.jamKeluar === "-" && (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleAbsenKeluar(index)}
                  >
                    Absen Keluar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Absensi;
