import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* ==============================================
   SAMPLE PRODUCT DATA (จากหน้า product list)
============================================== */
const sampleProducts = [
  {
    id: 1,
    name: "Royal Canin Kitten",
    price: 450,
    age_group: "kitten",
    category: "dry",
    breed_type: ["all"],
    health: ["general"],
    description:
      "โภชนาการสำหรับลูกแมว 2–12 เดือน ช่วยเสริมภูมิคุ้มกันและการเจริญเติบโต",
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
    description:
      "อาหารแมวโตเลี้ยงในบ้าน ลดกลิ่นอุจจาระ ควบคุมก้อนขน และพลังงานเหมาะสม",
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
    description:
      "ช่วยดูแลระบบปัสสาวะ ลดความเสี่ยงโรคนิ่วและการเกิดผลึกในแมวโต",
    image_url: "/catfood/images/Urinary-Care.jpg",
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = sampleProducts.find((p) => p.id === Number(id));

  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  /* Load localStorage */
  useEffect(() => {
    const savedFav = JSON.parse(localStorage.getItem("favorites")) || [];
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setFavorites(savedFav);
    setCart(savedCart);
  }, []);

  const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  /* FAVORITE */
  const toggleFavorite = () => {
    let updated;
    if (favorites.includes(product.id)) {
      updated = favorites.filter((f) => f !== product.id);
    } else {
      updated = [...favorites, product.id];
    }
    setFavorites(updated);
    saveData("favorites", updated);
  };

  /* CART */
/* CART */
const addToCart = () => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // หาว่าสินค้านี้มีอยู่แล้วไหม
  const index = cartItems.findIndex((item) => item.id === product.id);

  if (index >= 0) {
    // ถ้ามีแล้ว → เพิ่มจำนวน
    cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
  } else {
    // ถ้าไม่มี → เพิ่มใหม่พร้อม quantity
    cartItems.push({
      ...product,
      quantity: 1,
    });
  }

  // เซฟ
  localStorage.setItem("cart", JSON.stringify(cartItems));
  setCart(cartItems);

  // แจ้ง navbar ให้รีเฟรชจำนวน
  window.dispatchEvent(new Event("cart-updated"));

  alert("เพิ่มลงตะกร้าแล้ว!");
};



  if (!product)
    return (
      <p className="text-center py-20 text-gray-500">
        ไม่พบสินค้า
      </p>
    );

  const isFav = favorites.includes(product.id);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* =========================== */}
      {/* BACK BUTTON */}
      {/* =========================== */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-red-600 mb-6 font-medium"
      >
        <span className="text-xl">←</span> กลับไปหน้าสินค้า
      </button>

      {/* =========================== */}
      {/* PRODUCT GRID */}
      {/* =========================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full rounded-xl shadow-md"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4">

          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-red-600 font-bold text-2xl">{product.price} ฿</p>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* TAGS */}
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-gray-700">
              <strong>ช่วงวัย:</strong> {product.age_group}
            </p>
            <p className="text-gray-700">
              <strong>ประเภทอาหาร:</strong> {product.category}
            </p>
            <p className="text-gray-700">
              <strong>สายพันธุ์ที่เหมาะ:</strong> {product.breed_type.join(", ")}
            </p>

            {product.health && (
              <p className="text-gray-700">
                <strong>สุขภาพเฉพาะทาง:</strong> {product.health.join(", ")}
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">

            {/* 🛒 ADD TO CART */}
            <button
              onClick={addToCart}
              className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
            >
              🛒 เพิ่มลงตะกร้า
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
