import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function ProductListPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const initialFilters = {
    type: params.get("type") || "",
    age: params.get("age") || "",
    health: params.get("health") || "",
    breed: params.get("breed") || "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [toast, setToast] = useState(null);

  /* ⭐ โหลดสินค้าแบบดึง API จริง */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        const products = res.data;

        // เติม field health ให้ทุกสินค้าที่ไม่มี เพื่อป้องกัน error filter
        const normalized = products.map((p) => ({
          ...p,
          health: p.health || [], // backend ไม่มี field health แต่ frontend ใช้ filter
        }));

        setAllProducts(normalized);
        setFiltered(normalized);
      } catch (err) {
        console.error("❌ โหลดสินค้าจาก API ไม่สำเร็จ", err);
        setAllProducts([]);
        setFiltered([]);
      }
    };

    fetchProducts();
  }, []);

  /* เพิ่มลงตะกร้า */
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);

    if (index >= 0) cart[index].quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));

    setToast(`${product.name} ถูกเพิ่มลงตะกร้าแล้ว 🛒`);
    setTimeout(() => setToast(null), 2000);
  };

  /* FILTER LOGIC */
  useEffect(() => {
    let result = allProducts;

    if (filters.type) result = result.filter((p) => p.category === filters.type);
    if (filters.age) result = result.filter((p) => p.age_group === filters.age);
    if (filters.health)
      result = result.filter((p) =>
        (p.health || [])
          .map((h) => h.toLowerCase())
          .includes(filters.health.toLowerCase())
      );
    if (filters.breed)
      result = result.filter(
        (p) => p.breed_type.includes(filters.breed) || p.breed_type.includes("all")
      );

    setFiltered(result);
  }, [filters, allProducts]);

  const updateFilter = (k, v) => setFilters((prev) => ({ ...prev, [k]: v }));
  const resetFilters = () => setFilters({ type: "", age: "", health: "", breed: "" });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">เลือกประเภทอาหาร</h1>

      <QuickFoodType filters={filters} setFilter={updateFilter} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-10">
        {/* FILTER */}
        <aside className="md:col-span-1 bg-white border rounded-xl shadow-sm p-6 h-fit">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">ตัวกรองสินค้า</h2>
            <button onClick={resetFilters} className="text-sm text-red-600 hover:underline">
              ล้างทั้งหมด
            </button>
          </div>

          <DropdownSelect
            label="ช่วงวัยแมว"
            value={filters.age}
            options={[
              { label: "ทั้งหมด", value: "" },
              { label: "ลูกแมว (Kitten)", value: "kitten" },
              { label: "แมวโต (Adult)", value: "adult" },
              { label: "สูตรดูแลพิเศษ", value: "special_care" },
            ]}
            onChange={(v) => updateFilter("age", v)}
          />

          <DropdownSelect
            label="สุขภาพเฉพาะทาง"
            value={filters.health}
            options={[
              { label: "ทั้งหมด", value: "" },
              { label: "Urinary", value: "urinary" },
              { label: "Hairball", value: "hairball" },
              { label: "ควบคุมน้ำหนัก", value: "weight" },
            ]}
            onChange={(v) => updateFilter("health", v)}
          />

          <DropdownSelect
            label="สายพันธุ์แมว"
            value={filters.breed}
            options={[
              { label: "ทุกสายพันธุ์", value: "" },
              { label: "เปอร์เซีย", value: "เปอร์เซีย" },
              { label: "บริติชช็อตแฮร์", value: "บริติชช็อตแฮร์" },
            ]}
            onChange={(v) => updateFilter("breed", v)}
          />
        </aside>

        {/* PRODUCT GRID */}
        <main className="md:col-span-3">
          <p className="text-gray-500 mb-4">พบ {filtered.length} รายการ</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="
          fixed bottom-6 left-1/2 -translate-x-1/2 
          bg-black/80 text-white px-5 py-3 rounded-xl 
          text-sm shadow-lg animate-fadeIn z-50
        "
        >
          {toast}
        </div>
      )}
    </div>
  );
}

/* PRODUCT CARD ------------------------------------------------- */
function ProductCard({ product, addToCart }) {
  return (
    <div
      className="
      bg-white border rounded-2xl overflow-hidden shadow-sm 
      hover:shadow-xl transition-all duration-300 group flex flex-col
    "
    >
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
          แนะนำ
        </span>
      </div>

      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-semibold text-lg text-gray-900 min-h-[50px]">{product.name}</h3>

        <p className="text-red-600 font-bold mb-3">{product.price} ฿</p>

        <button
          onClick={() => addToCart(product)}
          className="
            mt-auto w-full py-2.5 
            bg-gradient-to-r from-red-500 to-red-600 
            text-white font-semibold rounded-xl 
            shadow-md hover:shadow-lg 
            transition-all duration-300 
            flex items-center justify-center gap-2
            hover:from-red-600 hover:to-red-700
            active:scale-[0.97]
          "
        >
          🛒 เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
}

/* CATEGORY BUTTONS --------------------------------------------- */
function QuickFoodType({ filters, setFilter }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <LargeCard
        label="อาหารเม็ด"
        active={filters.type === "dry"}
        onClick={() => setFilter("type", "dry")}
      />
      <LargeCard
        label="อาหารเปียก"
        active={filters.type === "wet"}
        onClick={() => setFilter("type", "wet")}
      />
      <LargeCard
        label="ขนมแมว"
        active={filters.type === "snack"}
        onClick={() => setFilter("type", "snack")}
      />
    </div>
  );
}

function LargeCard({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-xl text-center border font-semibold text-lg transition
        ${
          active
            ? "bg-red-600 text-white border-red-600 shadow-md"
            : "bg-white text-gray-800 border-gray-300 hover:shadow-md"
        }`}
    >
      {label}
    </button>
  );
}

/* SELECT ------------------------------------------------------ */
function DropdownSelect({ label, value, options, onChange }) {
  return (
    <div className="mb-6">
      <label className="font-medium text-gray-700 block mb-2">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 bg-gray-50 hover:bg-gray-100 transition"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
