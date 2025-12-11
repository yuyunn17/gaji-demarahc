import React, { useState } from "react";

// === Modal Tambah/Edit Tindakan === //
function FeeTindakanModal({ show, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(
    initialData || { pasien: "", alamat: "", treatment: "", harga: "", fee: "" }
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); 
    setForm({ pasien: "", alamat: "", treatment: "", harga: "", fee: "" });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow">
        <h3 className="text-lg font-bold mb-4">
          {initialData ? "Edit Tindakan Pasien" : "Tambah Tindakan Pasien"}
        </h3>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input id="pasien" placeholder="Nama Pasien" value={form.pasien}
            onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          <input id="alamat" placeholder="Alamat" value={form.alamat}
            onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          <input id="treatment" placeholder="Jenis Treatment" value={form.treatment}
            onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          <input type="number" id="harga" placeholder="Harga Treatment" value={form.harga}
            onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          <input type="number" id="fee" placeholder="Fee (%)" value={form.fee}
            onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Batal</button>
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// === Modal Tambah/Edit Fee Paket === //
function FeePaketModal({ show, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(
    initialData || { pasien: "", paket: "", hargaPaket: "", fee: "" }
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ pasien: "", paket: "", hargaPaket: "", fee: "" });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow">
        <h3 className="text-lg font-bold mb-4">
          {initialData ? "Edit Fee Paket" : "Tambah Fee Paket"}
        </h3>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input id="pasien" placeholder="Nama Pasien" value={form.pasien}
            onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          <input id="paket" placeholder="Jenis Paket" value={form.paket}
            onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          <input type="number" id="hargaPaket" placeholder="Harga Paket" value={form.hargaPaket}
            onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          <input type="number" id="fee" placeholder="Fee" value={form.fee}
            onChange={handleChange} className="border rounded px-3 py-2 w-full" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Batal</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// === Halaman Gaji === //
function Gaji() {
  const [gajiData, setGajiData] = useState([]);
  const [feePaketData, setFeePaketData] = useState([]);
  const [showModalTindakan, setShowModalTindakan] = useState(false);
  const [showModalPaket, setShowModalPaket] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editType, setEditType] = useState(null);

  // Tambah atau Edit Tindakan
  const handleTindakanSubmit = (data) => {
    if (editData) {
      setGajiData(gajiData.map((g) => (g.id === editData.id ? { ...data, id: g.id } : g)));
      setEditData(null);
      setEditType(null);
    } else {
      setGajiData([...gajiData, { ...data, id: Date.now() }]);
    }
  };

  // Tambah atau Edit Fee Paket
  const handlePaketSubmit = (data) => {
    if (editData) {
      setFeePaketData(feePaketData.map((f) => (f.id === editData.id ? { ...data, id: f.id } : f)));
      setEditData(null);
      setEditType(null);
    } else {
      setFeePaketData([...feePaketData, { ...data, id: Date.now() }]);
    }
  };

  // Delete
  const handleDelete = (id, type) => {
    if (type === "tindakan") {
      setGajiData(gajiData.filter((g) => g.id !== id));
    } else {
      setFeePaketData(feePaketData.filter((f) => f.id !== id));
    }
  };

  // Hitung total
  const totalFeeTindakan = gajiData.reduce(
    (acc, g) => acc + (Number(g.harga) * Number(g.fee)) / 100,
    0
  );
  const totalFeePaket = feePaketData.reduce(
    (acc, f) => acc + Number(f.fee),
    0
  );
  const feeTransport = 100000;
  const potonganBPJSTK = 50000;
  const totalGaji = totalFeeTindakan + totalFeePaket + feeTransport - potonganBPJSTK;

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#CC45DE] mb-6">Gaji</h2>
      <p className="text-sm text-gray-500 mb-8">💵 &gt; Gaji</p>

      {/* === Tabel Tindakan Pasien === */}
      <div className="border rounded-lg p-4 mb-6 bg-white shadow">
        <h3 className="font-semibold mb-3">Tindakan Pasien</h3>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Pasien</th>
              <th className="border px-3 py-2">Alamat</th>
              <th className="border px-3 py-2">Treatment</th>
              <th className="border px-3 py-2 text-right">Harga</th>
              <th className="border px-3 py-2 text-right">Fee</th>
              <th className="border px-3 py-2 text-right">Harga Fee</th>
              <th className="border px-3 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {gajiData.map((g) => (
              <tr key={g.id}>
                <td className="border px-3 py-2">{g.pasien}</td>
                <td className="border px-3 py-2">{g.alamat}</td>
                <td className="border px-3 py-2">{g.treatment}</td>
                <td className="border px-3 py-2 text-right">
                  Rp {Number(g.harga).toLocaleString("id-ID")}
                </td>
                <td className="border px-3 py-2 text-right">{g.fee}%</td>
                <td className="border px-3 py-2 text-right">
                  Rp {(Number(g.harga) * Number(g.fee) / 100).toLocaleString("id-ID")}
                </td>
                <td className="border px-3 py-2 text-center space-x-2">
                  <button
                    onClick={() => { setEditData(g); setEditType("tindakan"); setShowModalTindakan(true); }}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(g.id, "tindakan")}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => { setEditData(null); setEditType("tindakan"); setShowModalTindakan(true); }}
          className="mt-3 bg-purple-200 text-purple-700 px-3 py-2 rounded-lg text-sm"
        >
          + Tambah Tindakan
        </button>
      </div>

      {/* === Tabel Fee Paket === */}
      <div className="border rounded-lg p-4 mb-6 bg-white shadow">
        <h3 className="font-semibold mb-3">Fee Paket</h3>
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Pasien</th>
              <th className="border px-3 py-2">Paket</th>
              <th className="border px-3 py-2 text-right">Harga Paket</th>
              <th className="border px-3 py-2 text-right">Fee</th>
              <th className="border px-3 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {feePaketData.map((f) => (
              <tr key={f.id}>
                <td className="border px-3 py-2">{f.pasien}</td>
                <td className="border px-3 py-2">{f.paket}</td>
                <td className="border px-3 py-2 text-right">
                  Rp {Number(f.hargaPaket).toLocaleString("id-ID")}
                </td>
                <td className="border px-3 py-2 text-right">
                  Rp {Number(f.fee).toLocaleString("id-ID")}
                </td>
                <td className="border px-3 py-2 text-center space-x-2">
                  <button
                    onClick={() => { setEditData(f); setEditType("paket"); setShowModalPaket(true); }}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(f.id, "paket")}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => { setEditData(null); setEditType("paket"); setShowModalPaket(true); }}
          className="mt-3 bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm"
        >
          + Tambah Fee Paket
        </button>
      </div>

      {/* === Komponen Gaji === */}
      <div className="border rounded-lg p-4 bg-white shadow">
        <h3 className="font-semibold mb-3">Komponen Gaji</h3>
        <div className="flex justify-between mb-1">
          <span>Total Fee Tindakan</span>
          <span>Rp {totalFeeTindakan.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Total Fee Paket</span>
          <span>Rp {totalFeePaket.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Fee Transport</span>
          <span>Rp {Number(feeTransport).toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between mb-1 text-red-600">
          <span>Potongan BPJSTK</span>
          <span>- Rp {potonganBPJSTK.toLocaleString("id-ID")}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-purple-600">
          <span>Total Gaji</span>
          <span>Rp {totalGaji.toLocaleString("id-ID")}</span>
        </div>
      </div>

      {/* === Modal === */}
      {editType === "tindakan" && (
        <FeeTindakanModal
          show={showModalTindakan}
          onClose={() => setShowModalTindakan(false)}
          onSubmit={handleTindakanSubmit}
          initialData={editData}
        />
      )}
      {editType === "paket" && (
        <FeePaketModal
          show={showModalPaket}
          onClose={() => setShowModalPaket(false)}
          onSubmit={handlePaketSubmit}
          initialData={editData}
        />
      )}
    </div>
  );
}

export default Gaji;
