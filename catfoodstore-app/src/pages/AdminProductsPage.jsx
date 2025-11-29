import React, { useState, useEffect } from "react";
import axios from "axios";

/* ⭐ React → /api → Nginx → backend */
const API_URL = "/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const [editItem, setEditItem] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  /* ⭐ ตรวจสิทธิ์เฉพาะ Admin เท่านั้น */
  useEffect(() => {
    if (role !== "admin") {
      alert("คุณไม่มีสิทธิ์เข้าหน้านี้");
      window.location.href = "/";
      return;
    }
    fetchProducts();
  }, []);

  /* ⭐ โหลดสินค้า */
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("โหลดสินค้าล้มเหลว");
    }
  };

  /* ⭐ เพิ่มสินค้าใหม่ */
  const addProduct = async () => {
    if (!newName || !newPrice || !newImage || !newDesc) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/admin/products`,
        {
          name: newName,
          description: newDesc,
          price: Number(newPrice),
          weight: "1kg",
          age_group: "kitten",
          breed_type: ["all"],
          category: "dry",
          image_url: newImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("เพิ่มสินค้าสำเร็จ");
      setShowAddForm(false);

      setNewName("");
      setNewPrice("");
      setNewImage("");
      setNewDesc("");

      fetchProducts();
    } catch (err) {
      console.error("Add error:", err);
      alert("เพิ่มสินค้าไม่สำเร็จ");
    }
  };

  /* ⭐ อัปเดตสินค้า */
  const updateProduct = async () => {
    try {
      await axios.put(
        `${API_URL}/admin/products/${editItem.id}`,
        editItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("แก้ไขข้อมูลสำเร็จ");
      setEditItem(null);
      fetchProducts();
    } catch (err) {
      console.error("Update error:", err);
      alert("แก้ไขสินค้าไม่สำเร็จ");
    }
  };

  /* ⭐ ลบสินค้า */
  const deleteProduct = async (id) => {
    if (!window.confirm("ต้องการลบสินค้านี้ใช่หรือไม่?")) return;

    try {
      await axios.delete(`${API_URL}/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("ลบสินค้าสำเร็จ");
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
      alert("ลบสินค้าไม่สำเร็จ");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        จัดการสินค้า (Admin)
      </h1>

      {/* ปุ่มเพิ่มสินค้า */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          + เพิ่มสินค้า
        </button>
      </div>

      {/* ตารางสินค้า */}
      <table className="w-full border rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border p-2">ภาพ</th>
            <th className="border p-2">ชื่อสินค้า</th>
            <th className="border p-2">ราคา</th>
            <th className="border p-2">จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border p-2">
                <img
                  src={p.image_url}
                  className="w-16 h-16 object-cover mx-auto rounded"
                />
              </td>

              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.price} บาท</td>

              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditItem(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal แก้ไขสินค้า */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">แก้ไขสินค้า</h2>

            <input
              type="text"
              className="border p-2 w-full mb-3 rounded"
              value={editItem.name}
              onChange={(e) =>
                setEditItem({ ...editItem, name: e.target.value })
              }
            />

            <input
              type="number"
              className="border p-2 w-full mb-3 rounded"
              value={editItem.price}
              onChange={(e) =>
                setEditItem({ ...editItem, price: Number(e.target.value) })
              }
            />

            <input
              type="text"
              className="border p-2 w-full mb-3 rounded"
              value={editItem.image_url}
              onChange={(e) =>
                setEditItem({ ...editItem, image_url: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full mb-3 rounded h-24"
              value={editItem.description}
              onChange={(e) =>
                setEditItem({ ...editItem, description: e.target.value })
              }
            ></textarea>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setEditItem(null)}
              >
                ยกเลิก
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={updateProduct}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
