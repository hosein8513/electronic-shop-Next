"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/Productcard";
import Sidebar from "@/components/SideBar";
import { useState } from "react";


const products = [
  {
    id: 1,
    title: "گوشی سامسونگ Galaxy S24 Ultra",
    category: "موبایل",
    description:
      "پرچمدار سامسونگ با نمایشگر ۶.۸ اینچی، دوربین ۲۰۰ مگاپیکسلی و تراشه اسنپدراگون ۸ نسل ۳؛ انتخابی فوق‌العاده برای عکاسی حرفه‌ای.",
    price: 89500000,
    image: "/images/s24.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    title: "لپ‌تاپ اپل MacBook Air M3",
    category: "لپ‌تاپ",
    description:
      "سبک، بی‌صدا و قدرتمند با تراشه M3 اپل و ۱۸ ساعت عمر باتری؛ همراه ایده‌آل برای کار و طراحی.",
    price: 78000000,
    image: "/images/macbook air m3.jpg",
    rating: 4.9,
  },
  {
    id: 3,
    title: "هدفون بی‌سیم Sony WH-1000XM5",
    category: "لوازم جانبی",
    description:
      "بهترین نویزکنسلینگ بازار با کیفیت صدای خیره‌کننده و ۳۰ ساعت پخش موسیقی؛ برای تمرکز بیشتر و لذت شنیداری عمیق‌تر.",
    price: 19500000,
    image: "/images/Sony WH-1000XM5.jpg",
    rating: 4.7,
  },
  {
    id: 4,
    title: "گوشی شیائومی Redmi Note 13 Pro",
    category: "موبایل",
    description:
      "ارزش خرید بی‌نظیر با دوربین ۲۰۰ مگاپیکسلی، نمایشگر AMOLED ۱۲۰ هرتز و شارژ سریع ۶۷ وات.",
    price: 16800000,
    image: "/images/Redmi Note 13 Pro.jpg",
    rating: 4.5,
  },
  {
    id: 5,
    title: "لپ‌تاپ گیمینگ ASUS ROG Strix G16",
    category: "لپ‌تاپ",
    description:
      "غول گیمینگ با گرافیک RTX 4070 و نمایشگر ۱۶۵ هرتز؛ تجربه‌ای روان از بازی‌های نسل جدید.",
    price: 112000000,
    image: "/images/ASUS ROG Strix G16.jpg",
    rating: 4.6,
  },
  {
    id: 6,
    title: "ساعت هوشمند اپل Watch Series 9",
    category: "لوازم جانبی",
    description:
      "ردیابی سلامت پیشرفته، نمایشگر همیشه روشن و اتصال سریع‌تر؛ دستیار هوشمند مچ دست شما.",
    price: 32000000,
    image: "/images/Watch Series 9.jpg",
    rating: 4.8,
  },
];

const heroCategories = ["موبایل", "لپ‌تاپ", "لوازم جانبی"];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setMenuOpen(true)} />

      {/* بنر هیرو */}
      <section className="bg-gradient-to-l from-blue-700 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
            دنیای تکنولوژی، یک قدم با شما
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto mb-7 leading-7">
            جدیدترین موبایل‌ها، لپ‌تاپ‌ها و لوازم جانبی با ضمانت اصالت،
            قیمت رقابتی و ارسال سریع
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {heroCategories.map((cat) => (
              <a
                key={cat}
                href="#products"
                className="bg-white/15 hover:bg-white/25 backdrop-blur px-6 py-2.5 rounded-full text-sm font-semibold border border-white/20 transition"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* بدنه اصلی: سایدبار + کانتنت */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

        <main id="products" className="flex-1 px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">
              محصولات منتخب
            </h2>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              مشاهده همه ←
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}