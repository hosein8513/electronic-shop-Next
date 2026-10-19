"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cart/action";
import FavoriteButton from "./FavoriteButton";

export default function AddToCart({ product }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartReducer?.items || []);
  const inCart = items.some((item) => item.id === product.id);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    dispatch(addToCart(product));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* دکمه‌های سبد خرید */}
      {inCart ? (
        <>
          {/* محصول در سبد است */}
          <button
            disabled
            className="flex-1 flex items-center justify-center gap-1 font-bold text-sm sm:text-base px-5 py-2.5 rounded-2xl bg-green-50 text-green-700 border-2 border-green-200 cursor-default"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M5 13l4 4L19 7" />
            </svg>
            در سبد خرید شماست
          </button>

          {/* حذف از سبد خرید */}
          <button
            onClick={() => dispatch(removeFromCart(product.id))}
            className="flex-1 flex items-center justify-center gap-1 font-bold text-sm sm:text-base px-5 py-2.5 rounded-2xl bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100 transition active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            حذف از سبد خرید
          </button>
        </>
      ) : (
        <button
          onClick={handleAdd}
          className="flex-1 flex items-center justify-center gap-2 font-bold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-lg bg-gradient-to-l from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-blue-300 transition active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {justAdded ? "✓ اضافه شد!" : "افزودن به سبد خرید"}
        </button>
      )}

      {/* دکمه علاقه‌مندی‌ها */}
      <FavoriteButton product={product} />
    </div>
  );
}