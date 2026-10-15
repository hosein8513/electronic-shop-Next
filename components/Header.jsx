"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCategories } from "@/context/CategoriesContext";
import { searchProducts } from "@/services/getProducts";

export default function Header() {
  const categories = useCategories();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  // بستن جستجو با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // بستن با دکمه Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsFocused(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // جستجوی زنده با debounce
  useEffect(() => {
    if (!isFocused || query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const data = await searchProducts(query.trim());
      setResults(data);
      setLoading(false);
    }, 400); // نیم ثانیه صبر بعد از تایپ

    return () => clearTimeout(timer);
  }, [query, isFocused]);

  const showDropdown = isFocused && query.trim().length >= 2;

  return (
    <>
      {/* اورلی تار پشت هدر موقع باز بودن جستجو */}
      {isFocused && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsFocused(false)}
        />
      )}

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 px-4 sm:px-6 h-16 max-w-7xl mx-auto">
          {/* لوگو */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-lg shadow-md">
              E
            </span>
            <span className="hidden sm:block text-xl font-extrabold bg-gradient-to-l from-blue-700 to-cyan-600 bg-clip-text text-transparent">
              الکترومارکت
            </span>
          </Link>

          {/* دسته‌بندی‌ها (دسکتاپ) */}
          <nav className="hidden md:flex items-center gap-1 mx-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.path}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* ★ بخش جستجو */}
          <div ref={searchRef} className="flex-1 max-w-md mx-auto relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="جستجوی محصول..."
              className={`w-full h-10 pr-10 pl-3 rounded-full bg-gray-100 border border-transparent outline-none text-sm transition-all duration-300
                ${
                  isFocused
                    ? "bg-white border-blue-400 ring-4 ring-blue-100 font-bold text-gray-900 shadow-lg shadow-blue-100"
                    : "focus:bg-white"
                }`}
            />
            <svg
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                isFocused ? "text-blue-500" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>

            {/* ★ دراپ‌دان نتایج */}
            {showDropdown && (
              <div className="absolute top-12 right-0 left-0 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[28rem] overflow-y-auto">
                {/* حالت لودینگ */}
                {loading && (
                  <div className="p-6 text-center text-sm text-gray-400">
                    در حال جستجو...
                  </div>
                )}

                {/* بدون نتیجه */}
                {!loading && results.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-3xl mb-2">🔍</p>
                    <p className="text-sm text-gray-500">
                      نتیجه‌ای برای «{query}» پیدا نشد
                    </p>
                  </div>
                )}

                {/* کارت‌های نتیجه */}
                {!loading &&
                  results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => {
                        setIsFocused(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-3 p-3 border-b border-gray-50 last:border-0 hover:bg-blue-50 transition group"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-blue-700 transition">
                          {product.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">
                          {product.category}
                        </p>
                      </div>
                      <span className="text-xs font-extrabold text-blue-700 whitespace-nowrap">
                        {product.price.toLocaleString("fa-IR")} تومان
                      </span>
                    </Link>
                  ))}

                {/* فوتر دراپ‌دان */}
                {!loading && results.length > 0 && (
                  <div className="bg-gray-50 px-4 py-2.5 text-center text-xs text-gray-400">
                    {results.length.toLocaleString("fa-IR")} نتیجه برای «{query}»
                  </div>
                )}
              </div>
            )}
          </div>

          {/* دکمه ورود */}
          <button className="shrink-0 flex items-center gap-2 bg-gradient-to-l from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-semibold px-4 sm:px-5 h-10 rounded-full shadow-md shadow-blue-200 transition active:scale-95">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="hidden sm:inline">ورود</span>
          </button>
        </div>
      </header>
    </>
  );
}