import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* =====================================================
   SAMPLE PRODUCTS
===================================================== */
const sampleProducts = [
  {
    id: 1,
    name: "Royal Canin Kitten",
    price: 450,
    age_group: "kitten",
    category: "dry",
    breed_type: ["all"],
    health: ["general"],
    image_url: "/catfood/images/kitten.jpg",
  },
  {
    id: 2,
    name: "Royal Canin Home Life Indoor",
    price: 389,
    age_group: "adult",
    category: "dry",
    breed_type: ["เปอร์เซีย", "บริติชช็อตแฮร์"],
    health: ["general"],
    image_url: "/catfood/images/indoor.jpg",
  },
  {
    id: 3,
    name: "Royal Canin Urinary Care",
    price: 520,
    age_group: "special_care",
    category: "dry",
    breed_type: ["all"],
    health: ["urinary"],
    image_url: "/catfood/images/Urinary-Care.jpg",
  },
  {
  id: 4,
  name: "Royal Canin Mother & Babycat Mousse",
  price: 69,
  age_group: "all",
  category: "wet",
  breed_type: ["all"],
  health: ["general"],
  image_url: "/catfood/images/mother-baby-wet.jpg",
},
{
  id: 5,
  name: "Royal Canin Persian Loaf",
  price: 39,
  age_group: "all",
  category: "wet",
  breed_type: ["persian"],
  health: ["general"],
  image_url: "/catfood/images/persian-loaf.jpg",  // ใช้รูปเดิมได้
},
{
  id: 6,
  name: "Royal Canin Wet Cat Food - Hair & Skin Pouch",
  price: 35,
  age_group: "special_care",
  category: "wet",
  breed_type: ["all"],
  health: ["Hairball"],
  image_url: "/catfood/images/hair-wet.jpg",
},
];

/* =====================================================
   MAIN PAGE
===================================================== */
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
  const [filtered, setFiltered] = useState(sampleProducts);

  /* FILTER LOGIC */
  useEffect(() => {
    let result = sampleProducts;

    if (filters.type)
      result = result.filter((p) => p.category === filters.type);

    if (filters.age)
      result = result.filter((p) => p.age_group === filters.age);

    if (filters.health)
      result = result.filter((p) => p.health.includes(filters.health));

    if (filters.breed)
      result = result.filter(
        (p) =>
          p.breed_type.includes(filters.breed) || p.breed_type.includes("all")
      );

    setFiltered(result);
  }, [filters]);

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const resetFilters = () =>
    setFilters({ type: "", age: "", health: "", breed: "" });

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        เลือกประเภทอาหาร
      </h1>

      {/* TOP FILTER — LARGE SQUARE CARDS */}
      <QuickFoodType filters={filters} setFilter={updateFilter} />

      {/* GRID: FILTER LEFT + PRODUCTS RIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-10">

        {/* FILTER BOX */}
        <aside className="md:col-span-1 bg-white border rounded-xl shadow-sm p-6 h-fit">

          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">ตัวกรองสินค้า</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-red-600 hover:underline"
            >
              ล้างทั้งหมด
            </button>
          </div>

          {/* AGE */}
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

          {/* HEALTH */}
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

          {/* BREED */}
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
          <p className="text-gray-500 mb-4">
            พบ {filtered.length} รายการ
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="mt-3 font-semibold">{p.name}</h3>
                <p className="text-red-600 font-bold mt-1">{p.price} ฿</p>
              </Link>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}

/* =====================================================
   TOP LARGE CATEGORY CARDS (FULL WIDTH)
===================================================== */
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
        ${active
          ? "bg-red-600 text-white border-red-600 shadow-md"
          : "bg-white text-gray-800 border-gray-300 hover:shadow-md"}
      `}
    >
      {label}
    </button>
  );
}

/* =====================================================
   SELECT COMPONENT
===================================================== */
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
