import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../Images/demaralogo.png";
import MomBaby from "../Images/loginkaryawan.png";

export default function LoginKaryawan() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (username === "karyawan" && password === "12345") {
      localStorage.setItem("karyawanLoggedIn", "true");
      navigate("/dashboard-karyawan");
    } else {
      setError("Username atau password salah!");
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT SIDE (Gambar besar ibu & anak) */}
      <div className="hidden lg:flex w-[70%] items-center justify-center overflow-hidden">
        <img
          src={MomBaby}
          alt="Mom and Baby"
          className="w-full h-full object-cover scale-70 object-left"
        />
      </div>

      {/* RIGHT SIDE (Logo + Form) */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-16 lg:-translate-x-60">
        <div className="flex flex-col justify-center items-center w-full max-w-sm">
          {/* LOGO BESAR */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={Logo}
              alt="Demara Health Care"
              className="w-40 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              Login Karyawan
            </h2>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4 w-full">
            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded text-sm text-center">
                {error}
              </div>
            )}

            <input
              type="text"
              placeholder="Username"
              className="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-purple-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-purple-300 text-purple-700 py-2 rounded-lg hover:bg-purple-400 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
