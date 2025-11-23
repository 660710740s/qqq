import React, { useState, useEffect } from "react";

export default function AdminProductsPage() {

  // ⬇⬇⬇ เช็คว่าเป็นแอดมินไหม ⬇⬇⬇
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("คุณไม่มีสิทธิ์เข้าหน้านี้");
      window.location.href = "/";
    }
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const saveProducts = (newList) => {
    setProducts(newList);
    localStorage.setItem("products", JSON.stringify(newList));
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">จัดการสินค้า (Admin)</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ชื่อสินค้า</th>
            <th className="border p-2">ราคา</th>
            <th className="border p-2">จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.price} บาท</td>
              <td className="border p-2 text-center">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                  แก้ไข
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
