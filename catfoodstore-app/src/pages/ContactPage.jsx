import React from "react";

export default function ContactPage() {
  return (
    <div className="w-full">

      {/* ================================ */}
      {/* HERO */}
      {/* ================================ */}
      <section className="bg-red-600 text-white py-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-4">
          ติดต่อเรา
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
          Srivilize พร้อมช่วยตอบทุกข้อสงสัยเกี่ยวกับโภชนาการแมว  
          และให้คำแนะนำเพื่อสุขภาพที่ดีที่สุดของน้องแมว 🐾
        </p>
      </section>

      {/* ================================ */}
      {/* SINGLE CONTACT BOX (CENTER) */}
      {/* ================================ */}
      <section className="max-w-4xl mx-auto py-20 px-6">

        <div className="bg-white p-10 rounded-2xl shadow-lg border">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ช่องทางการติดต่อ
          </h2>

          <div className="space-y-6">

            <ContactLink
              icon="📞"
              title="โทรศัพท์"
              detail="092-123-4567"
              link="tel:0921234567"
            />

            <ContactLink
              icon="💬"
              title="LINE Official"
              detail="@srivilize"
              link="https://line.me/R/ti/p/~srivilize"
            />

            <ContactLink
              icon="📧"
              title="อีเมล"
              detail="support@srivilize.com"
              link="mailto:support@srivilize.com"
            />

            <ContactLink
              icon="📘"
              title="Facebook"
              detail="Srivilize Cat Nutrition"
              link="https://facebook.com/srivilize"
            />

            <ContactStatic
              icon="📍"
              title="ที่อยู่ร้าน"
              detail="กรุงเทพฯ, ประเทศไทย"
            />
          </div>
        </div>

      </section>
    </div>
  );
}

/* ======================================================
   COMPONENT: CLICKABLE CONTACT ITEM
====================================================== */
function ContactLink({ icon, title, detail, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-100 transition cursor-pointer"
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-gray-600">{detail}</p>
      </div>
    </a>
  );
}

/* ======================================================
   COMPONENT: STATIC CONTACT ITEM
====================================================== */
function ContactStatic({ icon, title, detail }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-gray-600">{detail}</p>
      </div>
    </div>
  );
}
