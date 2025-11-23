import React from "react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="w-full">

      {/* ================================ */}
      {/* HERO */}
      {/* ================================ */}
      <section className="bg-red-600 text-white py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-3">
          ติดต่อ Srivilize
        </h1>
        <p className="text-lg md:text-xl opacity-95 max-w-3xl mx-auto">
          ทีมงานของเราพร้อมช่วยดูแลทุกคำถามเกี่ยวกับอาหารแมวและสุขภาพน้องเหมียว
        </p>
      </section>

      {/* ================================ */}
      {/* CONTACT CARDS */}
      {/* ================================ */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

        <ContactCard
          icon="📞"
          title="โทรศัพท์"
          detail="092-123-4567"
          link="tel:0921234567"
        />

        <ContactCard
          icon="💬"
          title="LINE Official"
          detail="@srivilize"
          link="https://line.me/R/ti/p/~srivilize"
        />

        <ContactCard
          icon="📧"
          title="อีเมล"
          detail="support@srivilize.com"
          link="mailto:support@srivilize.com"
        />

      </section>

      {/* ================================ */}
      {/* ADDRESS + HOURS */}
      {/* ================================ */}
      <section className="max-w-5xl mx-auto px-6 pb-20">

        <div className="bg-white p-10 rounded-2xl shadow-md border mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            ข้อมูลร้าน
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            {/* LEFT: ADDRESS */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                ที่อยู่ร้าน
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Srivilize Cat Nutrition Center <br />
                เขตบางกอก, กรุงเทพมหานคร <br />
                ประเทศไทย 10500
              </p>
            </div>

            {/* RIGHT: HOURS */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                เวลาทำการ
              </h3>
              <ul className="text-gray-600 leading-relaxed">
                <li>จันทร์ - ศุกร์ : 09:00 - 18:00</li>
                <li>เสาร์ : 10:00 - 17:00</li>
                <li>อาทิตย์ : ปิดทำการ</li>
              </ul>
            </div>

          </div>

          {/* BUTTON */}
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-xl 
                         font-semibold text-lg hover:bg-red-700"
            >
              เลือกซื้อสินค้า →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

/* *********************************************
   CONTACT CARD (PREMIUM STYLE)
********************************************** */
function ContactCard({ icon, title, detail, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white p-8 rounded-2xl shadow-md border flex flex-col items-center 
                 hover:shadow-xl transition cursor-pointer"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-bold text-xl text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-1">{detail}</p>
    </a>
  );
}
