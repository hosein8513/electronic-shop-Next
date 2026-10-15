"use client";

import { useState } from "react";

export default function AddToCart({ product }) {
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    // TODO: بعداً اینجا محصول رو به سبد خرید (context یا API) اضافه کن
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-auto flex flex-col sm:flex-row gap-3">
      {/* افزودن به سبد خرید */}
      <button
        onClick={handleAddToCart}
        disabled={added}
        className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-bold transition active:scale-95
          ${
            added
              ? "bg-green-600 text-white cursor-default"
              : "bg-gradient-to-l from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-md shadow-blue-200"
          }`}
      >
        {added ? (
          <>
            <span>✓</span> به سبد خرید اضافه شد
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            افزودن به سبد خرید
          </>
        )}
      </button>

      {/* افزودن به علاقه‌مندی‌ها */}
      <button
        onClick={() => setLiked(!liked)}
        aria-label="افزودن به علاقه‌مندی‌ها"
        className={`flex items-center justify-center gap-2 h-12 px-6 rounded-xl text-sm font-bold border transition active:scale-95
          ${
            liked
              ? "bg-red-50 border-red-200 text-red-600"
              : "bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500"
          }`}
      >
        <svg
          className="w-5 h-5"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {liked ? "در علاقه‌مندی‌ها" : "علاقه‌مندی"}
      </button>
    </div>
  );
}