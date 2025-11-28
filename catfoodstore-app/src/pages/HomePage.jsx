import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const [toast, setToast] = useState(null);
  const [products, setProducts] = useState([]);
  const [breedGroups, setBreedGroups] = useState({});

  /* ⭐ โหลดสินค้าจาก API */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products");
        const items = res.data;

        // + badge: 5 รายการแรกเป็นสินค้าใหม่
        const enhanced = items.map((p, index) => ({
          ...p,
          badge: index < 5 ? "new" : null,
        }));

        setProducts(enhanced);

        /* ⭐ GROUP BY BREED */
        const breedsMap = {};
        enhanced.forEach((p) => {
          (p.breed_type || []).forEach((breed) => {
            if (breed === "all") return; // ไม่เอา all
            if (!breedsMap[breed]) breedsMap[breed] = [];
            breedsMap[breed].push(p);
          });
        });

        setBreedGroups(breedsMap);
      } catch (e) {
        console.error("โหลดสินค้าไม่สำเร็จ:", e);
      }
    };

    fetchProducts();
  }, []);

  /* 🛒 เพิ่มลงตะกร้า */
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((i) => i.id === product.id);

    if (index >= 0) cart[index].quantity += 1;
    else cart.push({ ...product, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));

    setToast(`เพิ่ม ${product.name} ลงในตะกร้าแล้ว 🛒`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="w-full bg-white">

      {/* HERO */}
      <section
        className="pt-20 pb-28 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/catfood/images/canin2.jpg')" }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center backdrop-blur-sm bg-white/10 p-6 rounded-2xl">

          <div>
            <h1 className="text-5xl font-bold text-red-600 leading-tight">
              โภชนาการที่ใช่ สำหรับแมวของคุณ
            </h1>

            <p className="mt-4 text-gray-700 text-lg">
              คัดสรร Royal Canin คุณภาพสูง เพื่อสุขภาพดีในทุกช่วงวัยและทุกสายพันธุ์
            </p>

            <Link
              to="/products"
              className="inline-block mt-6 px-8 py-3 border border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition"
            >
              ดูสินค้าทั้งหมด →
            </Link>
          </div>
        </div>
      </section>

      {/* ⭐ สินค้าใหม่ */}
      <HomeSection
        title="สินค้าใหม่ (New Arrivals)"
        link="/products?new=true"
      >
        <HorizontalScroll products={products.slice(0, 5)} addToCart={addToCart} />
      </HomeSection>

      {/* ⭐ สินค้าแนะนำตามสายพันธุ์ */}
        <HomeSection 
          title="สินค้าแนะนำตามสายพันธุ์"
          link="/products"
        >
        {Object.keys(breedGroups).length === 0 ? (
          <p className="text-gray-500">ยังไม่มีสินค้าแยกตามสายพันธุ์</p>
        ) : (
          Object.keys(breedGroups).map((breed) => (
            <div key={breed} className="mb-10">
              <h3 className="text-xl font-bold mb-4">{breed}</h3>
              <HorizontalScroll
                products={breedGroups[breed]}
                addToCart={addToCart}
              />
            </div>
          ))
        )}
      </HomeSection>

      {/* Toast */}
      {toast && (
        <div className="
          fixed bottom-6 left-1/2 -translate-x-1/2 
          bg-black/80 text-white px-5 py-3 rounded-xl shadow-lg z-50
        ">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------
   SECTION WRAPPER
---------------------------------------- */
function HomeSection({ title, link, children }) {
  return (
    <section className="max-w-7xl mx-auto py-14 px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>

        {link && (
          <Link
            to={link}
            className="text-red-600 font-medium hover:underline"
          >
            ดูทั้งหมด →
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}


/* ----------------------------------------
   Horizontal Scroll + Arrows
---------------------------------------- */
function HorizontalScroll({ products, addToCart }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -350 : 350;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative group">

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        className="
          absolute left-2 top-1/2 -translate-y-1/2 
          bg-white/90 backdrop-blur shadow-lg 
          p-2 rounded-full z-10 hover:bg-red-100 transition
          opacity-0 group-hover:opacity-100
        "
      >
        ◀
      </button>

      {/* SCROLL AREA */}
      <div
        ref={scrollRef}
        className="
          flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar 
          px-2
        "
      >
        {products.map((p) => (
          <div key={p.id} className="min-w-[220px]">
            <PremiumProductCard product={p} addToCart={addToCart} />
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className="
          absolute right-2 top-1/2 -translate-y-1/2 
          bg-white/90 backdrop-blur shadow-lg 
          p-2 rounded-full z-10 hover:bg-red-100 transition
          opacity-0 group-hover:opacity-100
        "
      >
        ▶
      </button>
    </div>
  );
}


/* ----------------------------------------
   PRODUCT CARD
---------------------------------------- */
function PremiumProductCard({ product, addToCart }) {
  return (
    <div
      className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition"
    >
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image_url}
            className="w-full h-56 object-cover"
            alt={product.name}
          />
        </Link>

        {product.badge && (
          <span className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 text-xs rounded-full">
            ใหม่
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col">
        <h3 className="font-semibold text-lg leading-snug min-h-[48px]">
          {product.name}
        </h3>

        <p className="text-red-600 font-bold mb-4">{product.price} ฿</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-auto w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          🛒 เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
}
