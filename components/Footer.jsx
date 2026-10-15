"use client";

import Link from "next/link";
import { useCategories } from "@/context/CategoriesContext";

const footerLinks = [
  { title: "خدمات مشتریان", items: ["پیگیری سفارش", "شرایط بازگشت", "سوالات متداول", "تماس با ما"] },
  { title: "درباره ما", items: ["درباره الکترومارکت", "فرصت‌های شغلی", "حریم خصوصی", "قوانین و مقررات"] },
];

export default function Footer() {
  const categories = useCategories();

  return (
    <footer className="mt-12 bg-gray-900 text-gray-300">
      {/* نامه خبری */}
      <div className="bg-gradient-to-l from-blue-700 to-cyan-600">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold mb-1">عضویت در خبرنامه</p>
            <p className="text-blue-100 text-sm">
              از تخفیف‌ها و محصولات جدید زودتر باخبر شوید
            </p>
          </div>
          <form className="flex w-full sm:w-auto gap-2">
            <input
              type="email"
              placeholder="ایمیل شما"
              className="flex-1 sm:w-64 h-11 px-4 rounded-lg text-sm text-gray-800 outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 h-11 rounded-lg transition whitespace-nowrap">
              عضویت
            </button>
          </form>
        </div>
      </div>

      {/* لینک‌ها */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black">
              E
            </span>
            <span className="text-white font-extrabold text-lg">الکترومارکت</span>
          </div>
          <p className="text-sm leading-6 text-gray-400">
            فروشگاه آنلاین لوازم الکترونیکی با ضمانت اصالت کالا و ارسال سریع به سراسر کشور.
          </p>
        </div>

        {/* دسته‌بندی‌ها از Context */}
        <div>
          <h3 className="text-white font-bold text-sm mb-4">دسته‌بندی‌ها</h3>
          <ul className="space-y-2.5">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={cat.path} className="text-sm text-gray-400 hover:text-cyan-400 transition">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {footerLinks.map((col) => (
          <div key={col.title}>
            <h3 className="text-white font-bold text-sm mb-4">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800">
        <p className="max-w-7xl mx-auto px-6 py-5 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} تمامی حقوق برای الکترومارکت محفوظ است.
        </p>
      </div>
    </footer>
  );
}