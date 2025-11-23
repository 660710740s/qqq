import React from "react";
import { Link } from "react-router-dom";

// ตัวอย่างสินค้า
const sampleProducts = [
  {
    id: 1,
    name: "Royal Canin Kitten",
    price: 450,
    image_url: "/catfood/images/kitten.jpg",
  },
  {
    id: 2,
    name: "Royal Canin Home Life Indoor",
    price: 389,
    image_url: "/catfood/images/indoor.jpg",
  },
  {
    id: 3,
    name: "Royal Canin Urinary Care",
    price: 520,
    image_url: "/catfood/images/Urinary-Care.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="w-full">
      
      {/* HERO */}
      <section className="bg-red-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Srivilize — อาหารแมว Royal Canin ของแท้
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-6">
          คัดสรรโภชนาการคุณภาพสูง สำหรับทุกสายพันธุ์และทุกช่วงวัย
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/products"
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-100"
          >
            ดูสินค้าทั้งหมด
          </Link>
        </div>
      </section>

      {/* สินค้าใหม่ */}
      <HomeSection title="สินค้าใหม่ (New Arrivals)" link="/products">
        <ProductGrid products={sampleProducts} />
      </HomeSection>

      {/* สินค้าขายดี */}
      <HomeSection title="สินค้าขายดี (Best Sellers)" link="/products">
        <ProductGrid products={sampleProducts} />
      </HomeSection>

      {/* สำหรับสายพันธุ์ */}
      <HomeSection title="สินค้าแนะนำสำหรับสายพันธุ์ (Breed Specific)">
        <CollectionGrid>
          <CollectionCard
            title="เปอร์เซีย"
            img="/catfood/images/persian.Jpg"
            to="/products?breed=เปอร์เซีย"
          />
          <CollectionCard
            title="บริติชช็อตแฮร์"
            img="/catfood/images/british.Jpg"
            to="/products?breed=บริติชช็อตแฮร์"
          />
          <CollectionCard
            title="ทุกสายพันธุ์"
            img="/catfood/images/all.jpg"
            to="/products?breed=all"
          />
        </CollectionGrid>
      </HomeSection>

      {/* สำหรับช่วงวัย */}
      <HomeSection title="สูตรอาหารตามช่วงวัย (By Age)">
        <CollectionGrid>
          <CollectionCard
            title="ลูกแมว (Kitten)"
            img="/catfood/images/allkitten.jpg"
            to="/products?age=kitten"
          />
          <CollectionCard
            title="แมวโต (Adult)"
            img="/catfood/images/adult.jpg"
            to="/products?age=adult"
          />
          <CollectionCard
            title="สุขภาพพิเศษ"
            img="/catfood/images/health.jpg"
            to="/products?age=special_care"
          />
        </CollectionGrid>
      </HomeSection>

      {/* ปัญหาสุขภาพ */}
      <HomeSection title="ดูแลปัญหาสุขภาพ (Health Needs)">
        <CollectionGrid>
          <CollectionCard
            title="ระบบปัสสาวะ (Urinary)"
            img="/catfood/images/Urinary-Care.jpg"
            to="/products?health=urinary"
          />
          <CollectionCard
            title="ขนร่วง / Hairball"
            img="/catfood/images/hair.jpg"
            to="/products?health=hairball"
          />
          <CollectionCard
            title="ควบคุมน้ำหนัก"
            img="/catfood/images/weight.jpg"
            to="/products?health=weight"
          />
        </CollectionGrid>
      </HomeSection>

    </div>
  );
}

/* --------------------------
   Components
--------------------------- */

function HomeSection({ title, link, children }) {
  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {link && (
          <Link to={link} className="text-red-600 font-semibold">
            ดูทั้งหมด →
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function ProductGrid({ products }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
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
          <h3 className="mt-3 font-semibold text-gray-800">{p.name}</h3>
          <p className="text-red-600 font-bold mt-1">{p.price} ฿</p>
        </Link>
      ))}
    </div>
  );
}

function CollectionGrid({ children }) {
  return <div className="grid md:grid-cols-3 gap-6">{children}</div>;
}

function CollectionCard({ title, img, to }) {
  return (
    <Link
      to={to}
      className="bg-white p-6 text-center rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
    >
      <img
        src={img}
        alt={title}
        className="h-20 w-20 mx-auto object-contain mb-4"
      />
      <h3 className="font-semibold text-gray-800">{title}</h3>
    </Link>
  );
}