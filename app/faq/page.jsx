"use client";

import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    q: "چطور می‌توانم ثبت سفارش کنم؟",
    a: "کافیست محصول مورد نظر را انتخاب کنید، روی «افزودن به سبد خرید» بزنید و پس از تکمیل سبد، دکمه پرداخت را بزنید. خرید در الکترومارکت بدون ثبت‌نام امکان‌پذیر نیست، پس اول وارد حساب کاربری شوید.",
  },
  {
    q: "ارسال سفارش‌ها چقدر طول می‌کشد؟",
    a: "سفارش‌های تهران معمولاً بین ۱ تا ۲ روز کاری و شهرستان‌ها بین ۲ تا ۴ روز کاری به دست شما می‌رسند.",
  },
  {
    q: "امکان مرجوع کردن کالا وجود دارد؟",
    a: "بله. تا ۷ روز پس از دریافت کالا، در صورت سالم بودن بسته‌بندی و لوازم همراه، می‌توانید محصول را مرجوع کنید.",
  },
  {
    q: "محصولات گارانتی دارند؟",
    a: "تمام محصولات الکترومارکت اورجینال و دارای گارانتی معتبر شرکتی هستند. شرایط گارانتی هر محصول در صفحه همان محصول ذکر شده است.",
  },
  {
    q: "پرداخت هزینه چگونه انجام می‌شود؟",
    a: "پرداخت به‌صورت آنلاین و از طریق درگاه بانکی امن انجام می‌شود. به‌زودی امکان پرداخت در محل هم اضافه خواهد شد.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

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

      <h1 className="text-2xl font-black text-gray-800 mb-2">❓ سوالات متداول</h1>
      <p className="text-sm text-gray-500 mb-6">
        پاسخ پرتکرارترین سوالات کاربران الکترومارکت
      </p>

      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl border shadow-sm transition ${
              openIndex === i ? "border-blue-200" : "border-gray-100"
            }`}
          >
            {/* سوال */}
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-right"
            >
              <span className="font-bold text-sm text-gray-800">{item.q}</span>
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-black transition ${
                  openIndex === i
                    ? "bg-blue-600 text-white rotate-45"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                +
              </span>
            </button>
            {/* جواب */}
            {openIndex === i && (
              <p className="px-5 pb-5 text-sm text-gray-600 leading-7 border-t border-gray-100 pt-4">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}