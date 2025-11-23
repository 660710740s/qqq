import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="w-full">

      {/* ================================ */}
      {/* HERO SECTION */}
      {/* ================================ */}
      <section className="bg-red-600 text-white py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
          เกี่ยวกับ Srivilize
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-95">
          ร้านอาหารแมวระดับพรีเมียม ที่ใส่ใจคุณภาพ โภชนาการ  
          และสุขภาพของแมวทุกตัวเหมือนเป็นครอบครัวเดียวกัน
        </p>
      </section>

      {/* ================================ */}
      {/* STORY SECTION */}
      {/* ================================ */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* IMAGE */}
        <img
          src="/catfood/images/about-cat.jpg"
          alt="Srivilize"
          className="rounded-2xl shadow-lg object-cover w-full h-80"
        />

        {/* TEXT */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            เรื่องราวเกี่ยวกับเรา
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Srivilize ก่อตั้งขึ้นจากความรักในแมวและความเชื่อที่ว่า  
            “โภชนาการที่ดี = สุขภาพที่ดี”  
            เราคัดสรรอาหารแมวเกรดพรีเมียมจากแบรนด์ชั้นนำ  
            ทุกสูตรผ่านการตรวจสอบคุณภาพ และเหมาะกับแมวทุกช่วงวัย  
            ทุกสายพันธุ์ รวมถึงแมวที่ต้องการโภชนาการเฉพาะทาง
          </p>
        </div>
      </section>

      {/* ================================ */}
      {/* FEATURES SECTION */}
      {/* ================================ */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            ทำไมต้องเลือก Srivilize?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <FeatureCard
              icon="🏆"
              title="สินค้าพรีเมียมแท้ 100%"
              desc="คัดสรรเฉพาะแบรนด์คุณภาพสูง ส่งตรงจากผู้จัดจำหน่ายที่ได้รับการรับรอง"
            />

            <FeatureCard
              icon="❤️"
              title="ใส่ใจทุกรายละเอียด"
              desc="แนะนำอาหารตามช่วงวัย สายพันธุ์ และปัญหาสุขภาพของแมว"
            />

            <FeatureCard
              icon="🚚"
              title="จัดส่งรวดเร็ว"
              desc="แพ็กสินค้าอย่างดี จัดส่งไวถึงบ้าน สะดวกและปลอดภัย"
            />

          </div>
        </div>
      </section>

      {/* ================================ */}
      {/* CTA SECTION */}
      {/* ================================ */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          พร้อมเลือกอาหารที่ดีที่สุดให้แมวของคุณหรือยัง?
        </h2>

        <p className="text-gray-600 mb-8 text-lg">
          สำรวจสินค้าทั้งหมดของเราได้เลย
        </p>

        <Link
          to="/products"
          className="bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transition"
        >
          ดูสินค้าทั้งหมด →
        </Link>
      </section>
    </div>
  );
}

/* COMPONENT: FEATURE CARD */
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
