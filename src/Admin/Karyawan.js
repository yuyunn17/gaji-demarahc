import React, { useState, useEffect } from "react";

function Karyawan() {

  const [data, setData] = useState(() => {
  try {
    const saved = localStorage.getItem("karyawanData");
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Gagal load data dari localStorage", err);
    return [];
  }
  });
  const [showTambah, setShowTambah] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({});

  // fungsi helper untuk ubah file jadi base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };


  // format tanggal untuk tampilan
  const formatTanggalDisplay = (dateStr) => {
    if (!dateStr) return "";
    const bulan = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agt", "Sep", "Okt", "Nov", "Des"
    ];
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return `${String(d.getDate()).padStart(2, "0")} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  };

  // generate ID otomatis
  const getNextId = () => {
    if (data.length === 0) return "001";
    const lastId = Math.max(...data.map((k) => parseInt(k.id)));
    return String(lastId + 1).padStart(3, "0");
  };

  // load data dari localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("karyawanData")) || [];
      setData(stored);
    } catch (err) {
      console.error("Gagal load data dari localStorage", err);
      setData([]);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("karyawanData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("karyawanData", JSON.stringify(data));
  }, [data]);

  // simpan data ke localStorage
  useEffect(() => {
    localStorage.setItem("karyawanData", JSON.stringify(data));
  }, [data]);

  // handle upload file (preview + formData)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setPreview(base64); // preview langsung
      setFormData({ ...formData, foto: base64 }); // simpan ke state
    }
  };

  // tambah data
  const handleTambah = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fotoFile = form.foto.files[0];
    let fotoBase64 = null;

    if (fotoFile) {
      fotoBase64 = await toBase64(fotoFile);
    }

    const newK = {
      id: getNextId(),
      nama: form.nama.value,
      posisi: form.posisi.value,
      nohp: form.nohp.value,
      email: form.email.value,
      alamat: form.alamat.value,
      tempatLahir: form.tempatLahir.value,
      tanggalLahir: form.tanggalLahir.value,
      tglMasuk: form.tglMasuk.value,
      tglKontrak: form.tglKontrak.value,
      lamaKontrak: form.lamaKontrak.value,
      foto: fotoBase64,
    };

    setData([...data, newK]);
    form.reset();
    setPreview(null);
    setShowTambah(false);
  };

  // edit data
  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const fotoFile = form.foto.files[0];
    let fotoBase64 = editData.foto;

    if (fotoFile) {
      fotoBase64 = await toBase64(fotoFile);
    }

    const updated = {
      ...editData,
      nama: form.nama.value,
      posisi: form.posisi.value,
      nohp: form.nohp.value,
      email: form.email.value,
      alamat: form.alamat.value,
      tempatLahir: form.tempatLahir.value,
      tanggalLahir: form.tanggalLahir.value,
      tglMasuk: form.tglMasuk.value,
      tglKontrak: form.tglKontrak.value,
      lamaKontrak: form.lamaKontrak.value,
      foto: fotoBase64,
    };

    setData(data.map((k) => (k.id === updated.id ? updated : k)));
    setShowEdit(false);
  };

  // hapus data
  const handleHapus = (id) => {
    if (window.confirm("Yakin ingin menghapus karyawan ini?")) {
      setData(data.filter((k) => k.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-[#CC45DE] mb-6">Data Karyawan</h2>
        <p className="text-sm text-gray-500 mb-4">👥 &gt; Data Karyawan</p>

        {/* Tombol Tambah */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowTambah(true)}
            className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white"
          >
            + Tambah Data
          </button>
        </div>

        {/* Tabel Karyawan */}
        <div className="bg-white shadow rounded-lg p-4">
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Nama</th>
                <th className="border px-4 py-2">Posisi</th>
                <th className="border px-4 py-2">Tanggal Masuk</th>
                <th className="border px-4 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((k) => (
                <tr key={k.id}>
                  <td className="border px-4 py-2">{k.id}</td>
                  <td className="border px-4 py-2">{k.nama}</td>
                  <td className="border px-4 py-2">{k.posisi}</td>
                  <td className="border px-4 py-2">{formatTanggalDisplay(k.tglMasuk)}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => { setDetailData(k); setShowDetail(true); }}
                      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                    >Detail</button>
                    <button
                      onClick={() => { setEditData(k); setShowEdit(true); }}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >Edit</button>
                    <button
                      onClick={() => handleHapus(k.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah */}
        {showTambah && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
              <h2 className="text-xl font-semibold mb-4">Tambah Data Karyawan</h2>
              <form onSubmit={handleTambah} className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama</label>
                  <input name="nama" className="w-full border px-3 py-2 rounded" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Posisi</label>
                  <input name="posisi" className="w-full border px-3 py-2 rounded" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Nomor HP</label>
                  <input name="nohp" className="w-full border px-3 py-2 rounded" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input name="email" type="email" className="w-full border px-3 py-2 rounded" required />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Alamat</label>
                  <textarea name="alamat" className="w-full border px-3 py-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                  <input name="tempatLahir" className="w-full border px-3 py-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                  <input name="tanggalLahir" type="date" className="w-full border px-3 py-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Foto</label>
                  <input name="foto" type="file" accept="image/*" onChange={handleFileChange} className="w-full border px-3 py-2 rounded" />
                  {preview && <img src={preview} alt="preview" className="w-24 h-24 rounded-full mt-2 object-cover" />}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Lama Kontrak</label>
                  <input name="lamaKontrak" className="w-full border px-3 py-2 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Masuk</label>
                  <input name="tglMasuk" type="date" className="w-full border px-3 py-2 rounded" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal Kontrak</label>
                  <input name="tglKontrak" type="date" className="w-full border px-3 py-2 rounded" />
                </div>

                <div className="col-span-2 flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => setShowTambah(false)} className="px-4 py-2 border rounded">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Detail */}
        {showDetail && detailData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">
              <h2 className="text-xl font-semibold mb-4">Detail Karyawan</h2>
              <div className="grid grid-cols-2 gap-3">
                {detailData.foto && (
                  <div className="col-span-2 flex justify-center">
                    <img src={detailData.foto} alt="Foto Karyawan" className="w-32 h-32 rounded-full object-cover mb-4" />
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-600">Nama</label>
                  <p className="border px-3 py-2 rounded bg-gray-50">{detailData.nama}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Posisi</label>
                  <p className="border px-3 py-2 rounded bg-gray-50">{detailData.posisi}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Nomor HP</label>
                  <p className="border px-3 py-2 rounded bg-gray-50">{detailData.nohp}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <p className="border px-3 py-2 rounded bg-gray-50">{detailData.email}</p>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm text-gray-600">Alamat</label>
                  <p className="border px-3 py-2 rounded bg-gray-50">{detailData.alamat}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Tempat Lahir</label>
                  <p className="border px-3 py-2 rounded bg-gray-50">{detailData.tempatLahir}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Tanggal Lahir</label>
                  <p className="border px-3 py-2 rounded bg-gray-50">{formatTanggalDisplay(detailData.tanggalLahir)}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Tanggal Masuk</label>
                  <p className="border px-3 py-2 rounded bg-gray-50">{formatTanggalDisplay(detailData.tglMasuk)}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Tanggal Kontrak</label>
                  <p className="border px-3 py-2 rounded bg-gray-50">{formatTanggalDisplay(detailData.tglKontrak)}</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Lama Kontrak</label>
                  <p className="border px-3 py-2 rounded bg-gray-50">{detailData.lamaKontrak}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button onClick={() => setShowDetail(false)} className="px-4 py-2 bg-gray-300 rounded">Tutup</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Edit */}
        {showEdit && editData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[600px] p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Karyawan</h2>
              <form onSubmit={handleEdit} className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama</label>
                  <input name="nama" defaultValue={editData.nama} className="border px-3 py-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Posisi</label>
                  <input name="posisi" defaultValue={editData.posisi} className="border px-3 py-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">No. HP</label>
                  <input name="nohp" defaultValue={editData.nohp} className="border px-3 py-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input name="email" defaultValue={editData.email} type="email" className="border px-3 py-2 rounded w-full" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Alamat</label>
                  <textarea name="alamat" defaultValue={editData.alamat} className="border px-3 py-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tempat Lahir</label>
                  <input name="tempatLahir" defaultValue={editData.tempatLahir} className="border px-3 py-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal Lahir</label>
                  <input name="tanggalLahir" defaultValue={editData.tanggalLahir} type="date" className="border px-3 py-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal Masuk</label>
                  <input name="tglMasuk" defaultValue={editData.tglMasuk} type="date" className="border px-3 py-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal Kontrak</label>
                  <input name="tglKontrak" defaultValue={editData.tglKontrak} type="date" className="border px-3 py-2 rounded w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Lama Kontrak</label>
                  <input name="lamaKontrak" defaultValue={editData.lamaKontrak} className="border px-3 py-2 rounded w-full" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium">Upload Foto</label>
                  <input name="foto" type="file" accept="image/*" onChange={handleFileChange} className="w-full border px-3 py-2 rounded" />
                  {preview && <img src={preview} alt="preview" className="w-24 h-24 rounded-full mt-2 object-cover" />}
                </div>

                <div className="col-span-2 flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => setShowEdit(false)} className="px-4 py-2 bg-gray-300 rounded">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Karyawan;
