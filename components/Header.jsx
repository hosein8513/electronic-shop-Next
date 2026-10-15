"use client";

import { useState } from "react";

const categories = ["موبایل", "لپ‌تاپ", "لوازم جانبی"];

export default function Header() {
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 px-4 sm:px-6 h-16 max-w-7xl mx-auto">
        {/* دکمه منو (موبایل) */}
        {/* <button
          onClick={onMenuClick}
          aria-label="باز کردن منو"
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button> */}

        {/* لوگو */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-lg shadow-md">
            E
          </span>
          <span className="hidden sm:block text-xl font-extrabold bg-gradient-to-l from-blue-700 to-cyan-600 bg-clip-text text-transparent">
            الکترومارکت
          </span>
        </a>

        {/* دسته‌بندی‌ها (دسکتاپ) */}
        <nav className="hidden md:flex items-center gap-1 mx-4">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#category-${cat}`}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition"
            >
              {cat}
            </a>
          ))}
        </nav>

        {/* نوار جستجو */}
        <div className="flex-1 max-w-md mx-auto relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی محصول..."
            className="w-full h-10 pr-10 pl-3 rounded-full bg-gray-100 border border-transparent focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none text-sm transition"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
  );
}