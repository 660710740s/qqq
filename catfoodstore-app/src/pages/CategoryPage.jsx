import React from "react";
import { useParams, Link } from "react-router-dom";

const sampleProducts = [
  {
    id: 1,
    name: "Royal Canin Kitten",
    price: 450,
    age_group: "kitten",
    category: "dry",
    breed_type: ["all"],
    image_url: "/catfood/images/kitten.jpg",
  },
  {
    id: 2,
    name: "Royal Canin Home Life Indoor",
    price: 389,
    age_group: "adult",
    category: "dry",
    breed_type: ["เปอร์เซีย", "บริติชช็อตแฮร์"],
    image_url: "/catfood/images/indoor.jpg",
  },
  {
    id: 3,
    name: "Royal Canin Urinary Care",
    price: 520,
    age_group: "special_care",
    category: "dry",
    breed_type: ["all"],
    image_url: "/catfood/images/Urinary-Care.jpg",
  },
];

export default function CategoryPage() {
  const { categoryName } = useParams();

  const filtered = sampleProducts.filter(
    (p) =>
      p.age_group === categoryName ||
      p.category === categoryName ||
      p.breed_type.includes(categoryName)
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        หมวดหมู่: <span className="text-red-600">{categoryName}</span>
      </h1>

      {filtered.length === 0 ? (
        <p>ไม่พบสินค้าตามหมวดนี้</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="border rounded-lg p-4 bg-white hover:shadow-lg transition"
            >
              <img
                src={p.image_url}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-3 font-semibold">{p.name}</h3>
              <p className="text-red-600 font-bold mt-1">{p.price} ฿</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
