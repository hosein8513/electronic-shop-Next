"use client";

import { useEffect, useState } from "react";

export default function FavoriteButton({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // بازیابی وضعیت علاقه‌مندی هنگام لود
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(saved.some((item) => item.id === product.id));
  }, [product.id]);

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      // حذف از علاقه‌مندی‌ها
      const newFavorites = saved.filter((item) => item.id !== product.id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // افزودن به علاقه‌مندی‌ها
      localStorage.setItem("favorites", JSON.stringify([...saved, product]));
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      title={isFavorite ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      className={`shrink-0 w-14 h-[3.25rem] flex items-center justify-center rounded-2xl border-2 transition active:scale-90
        ${
          isFavorite
            ? "bg-rose-50 border-rose-300 text-rose-500"
            : "bg-white border-gray-200 text-gray-400 hover:border-rose-300 hover:text-rose-400"
        }`}
    >
      <svg
        className="w-6 h-6"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}