"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="py-8 max-w-3xl mx-auto">
      {/* دکمه بازگشت */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-700 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-full px-4 py-2 mb-6 shadow-sm transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        بازگشت به صفحه اصلی
      </Link>

      <h1 className="text-2xl font-black text-gray-800 mb-6">📞 تماس با ما</h1>

      {/* کارت‌های اطلاعات تماس */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: "✉️", title: "ایمیل", value: "info@electromarket.ir", ltr: true },
          { icon: "☎️", title: "تلفن پشتیبانی", value: "۰۲۱-۱۲۳۴۵۶۷۸", ltr: false },
          { icon: "📍", title: "آدرس", value: "تهران، خیابان ولیعصر", ltr: false },
        ].map((c) => (
          <div
            key={c.title}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md transition"
          >
            <span className="text-3xl">{c.icon}</span>
            <p className="font-black text-gray-800 mt-2 text-sm">{c.title}</p>
            <p
              dir={c.ltr ? "ltr" : "rtl"}
              className={`text-xs text-gray-500 mt-1 ${c.ltr ? "text-center" : ""}`}
            >
              {c.value}
            </p>
          </div>
        ))}
      </div>

      {/* فرم پیام */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-6 space-y-4"
      >
        <h2 className="font-black text-gray-800">پیام مستقیم بفرستید</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="نام شما"
            className="h-12 px-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none text-sm focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition"
          />
          <input
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
            className="h-12 px-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none text-sm text-left focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder="پیام شما..."
          className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none text-sm resize-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition"
        />

        {sent && (
          <p className="rounded-2xl bg-green-50 text-green-700 border border-green-200 px-4 py-3 text-sm font-bold">
            پیام شما با موفقیت ارسال شد ✅ به‌زودی پاسخ می‌دهیم
          </p>
        )}

        <button
          type="submit"
          className="w-full h-12 rounded-2xl bg-gradient-to-l from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-black text-sm shadow-lg shadow-blue-200 transition active:scale-[0.98]"
        >
          ارسال پیام
        </button>
      </form>
    </div>
  );
}