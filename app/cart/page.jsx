"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, loadCart } from "@/redux/cart/action";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cartReducer?.items || []);

  // بازیابی سبد از localStorage هنگام ورود به صفحه
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handlePay = () => {
    alert("اتصال به درگاه پرداخت...");
  };

  return (
    <div className="py-8 pb-32">
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
        <span className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">سبد خرید</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {items.length > 0
              ? `${items.length.toLocaleString("fa-IR")} محصول در سبد شما`
              : "سبد خرید شما خالی است"}
          </p>
        </div>
      </div>

      {/* سبد خالی */}
      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 flex flex-col items-center text-center">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-lg font-bold text-gray-700 mb-2">
            هنوز چیزی به سبد اضافه نکردی
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            از بین محصولات ما انتخاب کن و به سبد خرید اضافه کن
          </p>
          <Link
            href="/"
            className="bg-gradient-to-l from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-bold px-8 py-3 rounded-full shadow-md shadow-blue-200 transition active:scale-95"
          >
            رفتن به فروشگاه
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {/* کارت‌های محصولات */}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition"
            >
              {/* عکس محصول */}
              <Link href={`/products/${item.id}`} className="shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              {/* مشخصات */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-1 hover:text-blue-700 transition">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-xs text-gray-400 mt-1">{item.category}</p>
                <p className="text-blue-700 font-extrabold mt-2">
                  {item.price.toLocaleString("fa-IR")} تومان
                </p>
              </div>

              {/* دکمه حذف */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                title="حذف از سبد خرید"
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-red-500 bg-red-50 hover:bg-red-100 transition active:scale-90"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* نوار پایین: جمع مبلغ + دکمه پرداخت */}
      {items.length > 0 && (
        <div className="fixed bottom-0 right-0 left-0 z-30 bg-white/95 backdrop-blur border-t border-gray-200 shadow-2xl">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-400">مبلغ قابل پرداخت</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900">
                {total.toLocaleString("fa-IR")}
                <span className="text-sm font-bold text-gray-500 mr-1">تومان</span>
              </p>
            </div>
            <button
              onClick={handlePay}
              className="flex items-center gap-2 bg-gradient-to-l from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-black text-base px-8 sm:px-12 py-3.5 rounded-2xl shadow-lg shadow-blue-300 transition active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              پرداخت
            </button>
          </div>
        </div>
      )}
    </div>
  );
}