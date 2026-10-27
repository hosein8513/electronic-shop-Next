import Link from "next/link";
import { getProducts } from "@/services/getProducts";

export default async function SalePage() {
  const products = await getProducts();

  // فقط محصولات تخفیف‌دار
  const discounted = products.filter(
    (p) => p.discount && p.discount > 0
  );

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
        <span className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-rose-500 text-white flex items-center justify-center shadow-md shadow-orange-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">
            🍂 حراج پاییزه
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {discounted.length > 0
              ? `${discounted.length.toLocaleString("fa-IR")} محصول با تخفیف ویژه`
              : "فعلاً محصولی تخفیف نخورده"}
          </p>
        </div>
      </div>

      {/* کارد محصولات */}
      {discounted.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 flex flex-col items-center text-center">
          <p className="text-6xl mb-4">🏷️</p>
          <p className="text-lg font-bold text-gray-700">
            هنوز هیچ محصولی تخفیف نخورده
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {discounted.map((product) => {
            const price = product.price;
            const discount = product.discount;
            const finalPrice = Math.round(price * (1 - discount / 100));
            const savings = price - finalPrice;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col relative"
              >
                {/* بج درصد تخفیف */}
                <span className="absolute top-3 left-3 z-10 bg-gradient-to-l from-orange-500 to-rose-500 text-white text-sm font-black px-3 py-1.5 rounded-full shadow-md shadow-orange-200">
                  ٪{discount.toLocaleString("fa-IR")} تخفیف
                </span>

                {/* عکس */}
                <Link href={`/products/${product.id}`} className="block">
                  <div className="h-44 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                </Link>

                {/* جزئیات */}
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-xs text-blue-600 font-bold mb-1">
                    {product.category}
                  </p>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-base font-bold text-gray-800 line-clamp-2 hover:text-orange-600 transition">
                      {product.title}
                    </h3>
                  </Link>

                  {/* قیمت‌ها */}
                  <div className="mt-3">
                    {/* قیمت اصلی خط‌خورده */}
                    <p className="text-sm text-gray-400 line-through">
                      {price.toLocaleString("fa-IR")} تومان
                    </p>
                    {/* قیمت نهایی */}
                    <p className="text-lg font-black text-orange-600">
                      {finalPrice.toLocaleString("fa-IR")}
                      <span className="text-xs font-bold text-gray-500 mr-1">
                        تومان
                      </span>
                    </p>
                    {/* سود شما */}
                    <p className="text-xs font-bold text-green-600 mt-1">
                      سود شما: {savings.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>

                  {/* دکمه مشاهده */}
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-4 pt-4 border-t border-gray-100 text-center text-sm font-bold text-white bg-gradient-to-l from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 rounded-xl px-4 py-2.5 shadow-sm transition active:scale-95"
                  >
                    مشاهده جزئیات
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}