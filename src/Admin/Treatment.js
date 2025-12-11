import React, { useState } from "react";

// ======================
// DATA TREATMENTS
// ======================
const treatments = [
  { id: 1, nama: "Pijat Bayi Sehat", category: "Baby Treatment", harga: 150000 },
  { id: 2, nama: "Pijat Balita", category: "Baby Treatment", harga: 185000 },
  { id: 3, nama: "Pijat Pediatric Bayi", category: "Baby Treatment", harga: 195000 },
  { id: 4, nama: "Pijat Pediatric Balita", category: "Baby Treatment", harga: 165000 },
  { id: 5, nama: "Baby Spa (Pijat + Swim + Gym)", category: "Baby Treatment", harga: 275000 },

  { id: 6, nama: "Haircut Bayi", category: "Baby Treatment", harga: 100000 },
  { id: 7, nama: "Haircut + Nails Cut", category: "Baby Treatment", harga: 150000 },
  { id: 8, nama: "Pijat Bayi + Haircut", category: "Baby Treatment", harga: 275000 },

  { id: 9, nama: "Tindik Steril Manual", category: "Baby Treatment", harga: 150000 },
  { id: 10, nama: "Tindik Steril dr Evoo (One Push)", category: "Baby Treatment", harga: 700000 },

  { id: 11, nama: "Happy Pregnancy", category: "Mommy Treatment", harga: 350000 },
  { id: 12, nama: "Happy Mommy (Pijat Ibu Nifas)", category: "Mommy Treatment", harga: 350000 },
  { id: 13, nama: "Happy Buna (Pijat Ibu Pasca SC)", category: "Mommy Treatment", harga: 350000 },
  { id: 14, nama: "Release Pregnancy Massage", category: "Mommy Treatment", harga: 350000 },
  { id: 15, nama: "Comfort Mommy Massage", category: "Mommy Treatment", harga: 550000 },

  { id: 16, nama: "Konsultasi Laktasi", category: "Laktasi Treatment", harga: 150000 },
  { id: 17, nama: "Pijat Laktasi + Oksitosin", category: "Laktasi Treatment", harga: 275000 },
  { id: 18, nama: "Pijat Laktasi", category: "Laktasi Treatment", harga: 400000 },
  { id: 19, nama: "Pijat Arugaan Laktasi (New)", category: "Laktasi Treatment", harga: 550000 },

  // Happy Deals Package
  { id: 20, nama: "Happy Deals 1 (Pijat Laktasi + Pijat Oksitosin + Pijat Bayi)", category: "Happy Deals", harga: 550000, fee: 10 },
  { id: 21, nama: "Happy Deals 2 (Pijat Oksitosin + Pijat Bayi Pediatric)", category: "Happy Deals", harga: 525000, fee: 10 },
  { id: 22, nama: "Happy Deals 3 (Pijat Laktasi + Konsultasi & Belajar Menyusui + Pijat Bayi)", category: "Happy Deals", harga: 690000, fee: 10 },
  { id: 23, nama: "Happy Deals 4 (Pijat Laktasi + Konsultasi Menyusui)", category: "Happy Deals", harga: 290000, fee: 10 },
  { id: 24, nama: "Happy Deals 5 (Pijat Laktasi + Belajar Menyusui + Konsultasi)", category: "Happy Deals", harga: 400000, fee: 10 },
  { id: 25, nama: "Happy Deals 6 (Pijat Laktasi Payudara saja + Pijat Pediatric)", category: "Happy Deals", harga: 440000, fee: 10 },

  // Gift For Mom
  { id: 26, nama: "Gift For Mom 1 (Konsultasi + Pijat Laktasi + Pijat Oksitosin)", category: "Gift For Mom", harga: 550000, fee: 10 },
  { id: 27, nama: "Gift For Mom 2 (Full Paket + Pijat Bayi)", category: "Gift For Mom", harga: 950000, fee: 10 },

  // Konselor Laktasi Services
  { id: 28, nama: "Konsultasi Laktasi (Konselor Laktasi)", category: "Konselor Laktasi", harga: 250000, fee: 10 },
  { id: 29, nama: "Konsultasi + Pijat Laktasi (Konselor Laktasi)", category: "Konselor Laktasi", harga: 500000, fee: 10 },

  // Konsultasi MPASI
  { id: 30, nama: "Konsultasi MP-ASI (60 menit)", category: "Konselor Laktasi", harga: 250000, fee: 10 },

  // Layanan lainnya
  { id: 31, nama: "Konsultasi + Belajar Posisi & Pelekatan Menyusui", category: "Konselor Laktasi", harga: 450000, fee: 10 },
  { id: 32, nama: "Konsultasi + Terapi Bingung Puting", category: "Konselor Laktasi", harga: 450000, fee: 10 },
  { id: 33, nama: "Konsultasi + Terapi Oral Bayi (Finger Feeding)", category: "Konselor Laktasi", harga: 500000, fee: 10 },

    // Paket Pendampingan Laktasi (Bidan Konselor)
  { id: 34, nama: "4x Pijat Laktasi + Oksitosin (Dengan Konselor Laktasi)", category: "Paket Laktasi", harga: 1800000, fee: 10 },
  { id: 35, nama: "6x Pijat Laktasi + Oksitosin (Dengan Konselor Laktasi)", category: "Paket Laktasi", harga: 2700000, fee: 10 },
  { id: 36, nama: "10x Pijat Laktasi + Oksitosin (Dengan Konselor Laktasi)", category: "Paket Laktasi", harga: 4000000, fee: 10 },

  // Mom & Baby Treatment Package
  { id: 37, nama: "Paket Mom & Baby (Konsultasi + Pijat Laktasi + Oksitosin + Pijat Bayi)", category: "Mom & Baby Treatment", harga: 750000, fee: 10 },

  // Paket New Mom
  { id: 38, nama: "Paket New Mom (Konsultasi + Pijat Laktasi + Oksitosin + Belajar DBF)", category: "Mom & Baby Treatment", harga: 750000, fee: 10 },

  // Paket Re-Laktasi
  { id: 39, nama: "Paket Re-Laktasi (Konsultasi + Teknik Menyusui + SNS + Pijat Laktasi)", category: "Re-Laktasi Package", harga: 750000, fee: 10 },

  // Breastfeeding Classes
  { id: 40, nama: "Breastfeeding Class (Ibu saja)", category: "Breastfeeding Class", harga: 450000, fee: 10 },
  { id: 41, nama: "Breastfeeding & New Born Class (Pasangan)", category: "Breastfeeding Class", harga: 750000, fee: 10 },

  // Postnatal / Comfort Massage Packages
  { id: 42, nama: "Pemasangan Gurita/Bengkung", category: "Postnatal Package", harga: 600000, fee: 10 },

  { id: 43, nama: "Comfort Mommy Massage 14 Hari (4x Pijat)", category: "Postnatal Package", harga: 1500_000, fee: 10 },
  { id: 44, nama: "Comfort Mommy Massage 30 Hari (3x Pijat)", category: "Postnatal Package", harga: 1200_000, fee: 10 },
  { id: 45, nama: "Comfort Mommy Massage 4x (Free 1x Pijat Bayi)", category: "Postnatal Package", harga: 2000_000, fee: 10 },
  { id: 46, nama: "Comfort Mommy Massage 6x (Free 2x Pijat Bayi)", category: "Postnatal Package", harga: 3000_000, fee: 10 },

  // Paket ASI Lancar
  { id: 47, nama: "Bundle 4x Pijat Laktasi (Free 1x Pijat Bayi)", category: "Paket ASI Lancar", harga: 1000_000, fee: 10 },
  { id: 48, nama: "Bundle 6x Pijat Laktasi (Free 2x Pijat Bayi)", category: "Paket ASI Lancar", harga: 1500_000, fee: 10 },

  { id: 49, nama: "Bundle 4x Laktasi Oksitosin (Free 2x Pijat Bayi)", category: "Paket ASI Lancar", harga: 1500_000, fee: 10 },
  { id: 50, nama: "Bundle 6x Laktasi Oksitosin (Free 1x Pijat Laktasi + 1x Pijat Bayi)", category: "Paket ASI Lancar", harga: 2250_000, fee: 10 },

  // Buna Baby Package
  { id: 51, nama: "Buna Baby 4x Laktasi + 4x Pijat Bayi", category: "Buna Baby Package", harga: 1650000, fee: 10 },
  { id: 52, nama: "Buna Baby 6x Laktasi + 6x Pijat Bayi (Free 1x Laktasi + 1x Pijat Bayi)", category: "Buna Baby Package", harga: 2450000, fee: 10 },
  { id: 53, nama: "Buna Baby 10x Laktasi + 10x Pijat Bayi (Free 2x Laktasi + 2x Pijat Bayi)", category: "Buna Baby Package", harga: 3900000, fee: 10 },

  // Baby Pediatric Package
  { id: 54, nama: "Baby Package 4x Pijat Pediatric", category: "Baby Package", harga: 650000, fee: 10 },
  { id: 55, nama: "Baby Package 6x Pijat Pediatric (Free 1x Pijat Bayi)", category: "Baby Package", harga: 950000, fee: 10 },
  { id: 56, nama: "Baby Package 10x Pijat Pediatric (Free 2x Pijat Bayi)", category: "Baby Package", harga: 1650000, fee: 10 },

  // Re-Laktasi Arugaan Package
  { id: 57, nama: "Re-Laktasi Arugaan 4x (Free 1x Pijat Laktasi)", category: "Re-Laktasi Package", harga: 2000000, fee: 10 },
  { id: 58, nama: "Re-Laktasi Arugaan 6x", category: "Re-Laktasi Package", harga: 3000000, fee: 10 },

  // Program Menyusui (Perbaikan DBF / Bingung Puting)
  { id: 59, nama: "Program Menyusui 3x Pertemuan", category: "Program Menyusui", harga: 1000000, fee: 10 },
  { id: 60, nama: "Program Menyusui 4x Pertemuan", category: "Program Menyusui", harga: 1200000, fee: 10 },
  { id: 61, nama: "Program Menyusui 6x Pertemuan (Free 2x Pijat Bayi)", category: "Program Menyusui", harga: 1800000, fee: 10 },

  // Paket Pijat Hamil
  { id: 62, nama: "Paket Pijat Hamil 3x (Free 1x Pijat Hamil)", category: "Pijat Hamil Package", harga: 1000000, fee: 10 },
  { id: 63, nama: "Paket Pijat Hamil 4x", category: "Pijat Hamil Package", harga: 1300000, fee: 10 },
  { id: 64, nama: "Paket Pijat Hamil 6x", category: "Pijat Hamil Package", harga: 2000000, fee: 10 },

  // Paket Pijat Badan Pasca Melahirkan
  { id: 65, nama: "Pijat Badan Pasca Melahirkan 3x (Tanpa Pijat Perut)", category: "Pijat Pasca Melahirkan", harga: 1000000, fee: 10 },
  { id: 66, nama: "Pijat Badan Pasca Melahirkan 4x", category: "Pijat Pasca Melahirkan", harga: 1400000, fee: 10 },
  { id: 67, nama: "Pijat Badan Pasca Melahirkan 6x (Free 2x Pijat Bayi)", category: "Pijat Pasca Melahirkan", harga: 2000000, fee: 10 },

  // Happy New Born 1
  { id: 68, nama: "Happy New Born 1 – 3x Kunjungan", category: "New Born Package", harga: 500000, fee: 10 },
  { id: 69, nama: "Happy New Born 1 – 7x Kunjungan", category: "New Born Package", harga: 900000, fee: 10 },

  // Happy New Born 2
  { id: 70, nama: "Happy New Born 2 – 3x Kunjungan (+ Pijat Laktasi 3x + Konsultasi)", category: "New Born Package", harga: 1500000, fee: 10 },
  { id: 71, nama: "Happy New Born 2 – 7x Kunjungan (+ Pijat Laktasi 2x + Konsultasi + Pijat Bayi)", category: "New Born Package", harga: 2000000, fee: 10 },

  // Happy New Born 3 (Wonderful Package)
  { id: 72, nama: "Happy New Born 3 – 14x Kunjungan", category: "New Born Package", harga: 2000000, fee: 10 },
  { id: 73, nama: "Happy New Born 3 – 30x Kunjungan", category: "New Born Package", harga: 3000000, fee: 10 },

  ];

// FEE OTOMATIS BERDASARKAN KATEGORI
function getFeeByCategory(category) {
  const lower = category.toLowerCase();

  if (
    lower.includes("package") ||
    lower.includes("bundle") ||
    lower.includes("deal")
  ) {
    return 10; // fee paket/bundling
  }

  return 15; // fee single treatment
}

function Treatment() {
  const [dataTreatment, setDataTreatment] = useState(treatments);
  const [search, setSearch] = useState("");

  // FILTER DATA BY SEARCH
  const filteredData = dataTreatment.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex-1 p-6 bg-gray-100">
      {/* Header */}
      <h2 className="text-3xl font-bold text-[#CC45DE] mb-6">Kelola Treatment</h2>
      <p className="text-sm text-gray-500 mb-8">🛁 &gt; Kelola Treatment</p>

      <div className="bg-white p-6 rounded-2xl shadow-md">

        {/* TOP SECTION */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Daftar Treatment</h3>

          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            + Tambah Treatment
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari treatment..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2 text-left">Nama Treatment</th>
              <th className="border px-4 py-2 text-left">Kategori</th>
              <th className="border px-4 py-2 text-left">Harga</th>
              <th className="border px-4 py-2 text-left">Fee (%)</th>
              <th className="border px-4 py-2 text-left">Total Fee</th>
              <th className="border px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => {
              const fee = getFeeByCategory(item.category);
              const totalFee = (item.harga * fee) / 100;

              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.nama}</td>
                  <td className="border px-4 py-2">{item.category}</td>
                  <td className="border px-4 py-2">Rp {item.harga.toLocaleString()}</td>
                  <td className="border px-4 py-2">{fee}%</td>
                  <td className="border px-4 py-2">Rp {totalFee.toLocaleString()}</td>

                  <td className="border px-4 py-2 text-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition mr-2">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </main>
  );
}

export default Treatment;
