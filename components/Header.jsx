"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reciveUserResponse } from "@/redux/user/action";
import { useCategories } from "@/context/CategoriesContext";
import { searchProducts } from "@/services/getProducts";

export default function Header() {
  const categories = useCategories();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer?.data);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);

 // بازیابی کاربر از کوکی هنگام لود صفحه
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/me", { cache: "no-store" });
      const data = await res.json();
      dispatch(reciveUserResponse(data.user || null));
    } catch {}
  };
  fetchUser();
}, [dispatch]);

  // بستن جستجو و منو با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // بستن با Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsFocused(false);
        setMenuOpen(false);
      }
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
    }, 400);

    return () => clearTimeout(timer);
  }, [query, isFocused]);

  // خروج از حساب — API خروج خودت + خالی کردن state با اکشن موجود
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch {}
    dispatch(reciveUserResponse(null));
    setMenuOpen(false);
  };

  const showDropdown = isFocused && query.trim().length >= 2;

  const menuItems = [
    {
      label: "سبد خرید",
      href: "/cart",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      label: "علاقه‌مندی‌ها",
      href: "/favorites",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      label: "ویرایش پروفایل",
      href: "/profile",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

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

          {/* بخش جستجو */}
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
              <path strokeLinecap="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>

            {/* دراپ‌دان نتایج */}
            {showDropdown && (
              <div className="absolute top-12 right-0 left-0 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-h-[28rem] overflow-y-auto">
                {loading && (
                  <div className="p-6 text-center text-sm text-gray-400">
                    در حال جستجو...
                  </div>
                )}

                {!loading && results.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-3xl mb-2">🔍</p>
                    <p className="text-sm text-gray-500">
                      نتیجه‌ای برای «{query}» پیدا نشد
                    </p>
                  </div>
                )}

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
                        <p className="text-xs text-gray-400 mt-1">{product.category}</p>
                      </div>
                      <span className="text-xs font-extrabold text-blue-700 whitespace-nowrap">
                        {product.price.toLocaleString("fa-IR")} تومان
                      </span>
                    </Link>
                  ))}

                {!loading && results.length > 0 && (
                  <div className="bg-gray-50 px-4 py-2.5 text-center text-xs text-gray-400">
                    {results.length.toLocaleString("fa-IR")} نتیجه برای «{query}»
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ★ دکمه ورود / منوی کاربر */}
          {user ? (
            <div ref={menuRef} className="relative shrink-0">
              {/* دکمه نام کاربر */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 h-10 px-3 sm:px-4 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-100 transition"
              >
                <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center text-xs font-black">
                  {user.name?.charAt(0) || "U"}
                </span>
                <span className="hidden sm:block text-sm font-bold text-gray-800 max-w-24 truncate">
                  {user.name}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    menuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* منوی کاربر */}
              {menuOpen && (
                <div className="absolute top-12 left-0 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                  {/* هدر منو */}
                  <div className="px-4 py-3 bg-gradient-to-l from-blue-600 to-cyan-500 text-white">
                    <p className="text-sm font-bold truncate">{user.name}</p>
                    <p className="text-xs text-blue-100 truncate">{user.email}</p>
                  </div>

                  {/* آیتم‌های منو */}
                  <div className="p-1.5">
                    {menuItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}

                    {/* خط جداکننده */}
                    <div className="my-1.5 border-t border-gray-100" />

                    {/* خروج */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      خروج از حساب کاربری
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="shrink-0 flex items-center gap-2 bg-gradient-to-l from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-semibold px-4 sm:px-5 h-10 rounded-full shadow-md shadow-blue-200 transition active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden sm:inline">ورود</span>
            </Link>
          )}
        </div>
      </header>
    </>
  );
}