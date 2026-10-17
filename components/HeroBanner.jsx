"use client";

import Link from "next/link";
import { useCategories } from "@/context/CategoriesContext";

export default function HeroBanner() {
  const categories = useCategories();

  return (
    <section className="bg-gradient-to-l from-blue-700 via-blue-600 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 text-center">
        <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
          دنیای تکنولوژی،همیشه همراه شما
        </h1>
        <p className="text-blue-100 max-w-2xl mx-auto mb-7 leading-7">
          جدیدترین موبایل‌ها، لپ‌تاپ‌ها و لوازم جانبی با ضمانت اصالت،
          قیمت رقابتی و ارسال سریع
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.path}
              className="bg-white/15 hover:bg-white/25 backdrop-blur px-6 py-2.5 rounded-full text-sm font-semibold border border-white/20 transition"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}