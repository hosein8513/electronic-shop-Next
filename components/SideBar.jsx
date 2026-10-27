"use client";

import Link from "next/link";
import { useState } from "react";
import { useCategories } from "@/context/CategoriesContext";

export default function Sidebar() {
  const categories = useCategories();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* دکمه همبرگر - فقط موبایل */}
      <button
        onClick={() => setOpen(true)}
        aria-label="باز کردن منو"
        className="lg:hidden fixed bottom-5 right-5 z-30 p-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-300 hover:bg-blue-700 transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* اورلی موبایل */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:sticky top-16 lg:top-20 right-0 z-50 lg:z-0 h-[calc(100vh-4rem)] w-72 shrink-0
          bg-white border-l border-gray-200 p-5 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-800">دسته‌بندی‌ها</h2>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            aria-label="بستن منو"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-1.5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.path}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700
                hover:bg-gradient-to-l hover:from-blue-50 hover:to-cyan-50 hover:text-blue-700
                border border-transparent hover:border-blue-100 transition group"
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{cat.icon}</span>
                {cat.name}
              </span>
              <span className="text-xs text-gray-400 group-hover:text-blue-700 transition">
                ←
              </span>
            </Link>
          ))}
        </nav>

        {/* بنر تخفیف */}

<Link
  href="/sale"
  className="group relative block overflow-hidden bg-gradient-to-l from-orange-500 via-rose-500 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-orange-200 hover:shadow-2xl hover:shadow-orange-300 hover:scale-[1.02] transition-all duration-300"
>
  {/* دایره‌های تزئینی پس‌زمینه */}
  <span className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-500"></span>
  <span className="absolute -bottom-10 -right-6 w-40 h-40 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500"></span>

  <div className="relative">
    {/* بج حراج */}
    <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur text-xs sm:text-sm font-black px-3 py-1.5 rounded-full mb-3">
      🍂 فقط تا پایان پاییز
    </span>

    <p className="text-2xl sm:text-4xl font-black drop-shadow">
      حراج پاییزه
    </p>
    <p className="text-sm sm:text-base text-orange-100 mt-2 leading-relaxed">
      تا ٪۵۰ تخفیف روی محصولات منتخب
    </p>

    {/* دکمه مشاهده */}
    <span className="inline-flex items-center gap-2 mt-4 bg-white text-orange-600 text-sm font-black px-5 py-2.5 rounded-full shadow-md group-hover:gap-3 group-hover:bg-orange-50 transition-all duration-300">
      مشاهده تخفیف‌ها
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
      </svg>
    </span>
  </div>
</Link>
      </aside>
    </>
  );
}