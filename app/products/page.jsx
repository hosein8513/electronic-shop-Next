import Link from "next/link";
import { getProducts } from "@/services/getProducts";
import ProductCard from "@/components/Productcard";

export default async function ProductsPage() {
  const products = await getProducts();

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
        <span className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md shadow-blue-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">همه محصولات</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {products.length.toLocaleString("fa-IR")} محصول برای شما پیدا شد
          </p>
        </div>
      </div>

      {/* گرید محصولات */}
      {products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 flex flex-col items-center text-center">
          <p className="text-6xl mb-4">📦</p>
          <p className="text-lg font-bold text-gray-700">
            هنوز محصولی برای نمایش وجود ندارد
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}