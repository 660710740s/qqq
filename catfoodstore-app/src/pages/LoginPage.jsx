import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

const handleLogin = () => {
  if (!email || !password) {
    setError("กรุณากรอกอีเมลและรหัสผ่าน");
    return;
  }

  // 📌 ตรวจว่าเป็นแอดมินไหม
  if (email === "admin@cat.com" && password === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "admin");
    alert("เข้าสู่ระบบแบบผู้ดูแลระบบ!");
    navigate("/admin/products"); // ⬅ ไปหน้าจัดการสินค้า
    return;
  }

  // 📌 ผู้ใช้ทั่วไป
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("role", "user");
  localStorage.setItem("userEmail", email);

  alert("เข้าสู่ระบบสำเร็จ!");
  navigate("/"); // กลับหน้าแรก
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      {/* CARD */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border">

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          เข้าสู่ระบบ
        </h1>

        {/* FORM */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              อีเมล
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 
              focus:ring-red-300 focus:border-red-500 outline-none"
              placeholder="กรอกอีเมล"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              รหัสผ่าน
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 
              focus:ring-red-300 focus:border-red-500 outline-none"
              placeholder="กรอกรหัสผ่าน"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-red-600 text-white py-3 rounded-lg 
            font-semibold hover:bg-red-700 transition"
          >
            เข้าสู่ระบบ
          </button>
        </form>

      </div>
    </div>
  );
}
