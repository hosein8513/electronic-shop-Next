"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function FavoritesPage() {
  const router = useRouter();
  const user = useSelector((state) => state.userReducer?.data);
  const [favorites, setFavorites] = useState([]);
  const [ready, setReady] = useState(false);

  // بازیابی علاقه‌مندی‌ها از localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
    setReady(true);
  }, []);

  // گارد لاگین: کاربر مهمان → هدایت به صفحه ورود
  useEffect(() => {
    if (ready && !user) {
      router.push("/login");
    }
  }, [ready, user, router]);

  // حذف از علاقه‌مندی‌ها
  const removeFavorite = (id) => {
    const newFavorites = favorites.filter((item) => item.id !== id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  // تا وقتی وضعیت کاربر مشخص نشده، چیزی نشان نده (جلوگیری از پرش ناخواسته)
  if (!ready || !user) return null;

  return (
    <div className="py-8">
      {/* دکمه بازگشت به صفحه اصلی */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-700 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-full px-4 py-2 mb-6 shadow-sm transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        بازگشت به صفحه اصلی
      </Link>

      {/* هدر صفحه */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-rose-200">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">علاقه‌مندی‌های من</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {favorites.length > 0
              ? `${favorites.length.toLocaleString("fa-IR")} محصول نشان‌شده‌ی ${user.name}`
              : "هنوز محصولی را نشان نکرده‌ای"}
          </p>
        </div>
      </div>

      {/* علاقه‌مندی خالی */}
      {favorites.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 flex flex-col items-center text-center">
          <p className="text-6xl mb-4">💗</p>
          <h2 className="text-lg font-bold text-gray-700 mb-2">
            لیست علاقه‌مندی‌هایت خالی است
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            با زدن دکمه قلب در صفحه هر محصول، آن را اینجا ذخیره کن
          </p>
          <Link
            href="/products"
            className="bg-gradient-to-l from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-bold px-8 py-3 rounded-full shadow-md shadow-blue-200 transition active:scale-95"
          >
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              {/* عکس محصول */}
              <Link href={`/products/${item.id}`} className="block">
                <div className="h-44 bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              </Link>

              {/* جزئیات */}
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-xs text-blue-600 font-bold mb-1">{item.category}</p>
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-base font-bold text-gray-800 line-clamp-2 hover:text-blue-700 transition">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-blue-700 font-extrabold mt-3">
                  {item.price.toLocaleString("fa-IR")} تومان
                </p>

                {/* دکمه‌ها */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/products/${item.id}`}
                    className="flex-1 text-center text-sm font-bold text-white bg-gradient-to-l from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-xl px-4 py-2.5 shadow-sm transition active:scale-95"
                  >
                    مشاهده جزئیات
                  </Link>
                  <button
                    onClick={() => removeFavorite(item.id)}
                    title="حذف از علاقه‌مندی‌ها"
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-rose-500 bg-rose-50 hover:bg-rose-100 transition active:scale-90"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}