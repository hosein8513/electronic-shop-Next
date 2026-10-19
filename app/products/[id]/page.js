import Link from "next/link";
import AddToCart from "@/components/AddToCart";
import { getProductById, getProducts } from "@/services/getProducts";
import ProductCard from "@/components/Productcard";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  // محصول پیدا نشد
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <h1 className="text-xl font-bold text-gray-800 mb-2">محصول یافت نشد</h1>
            <Link
              href="/"
              className="inline-block mt-4 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-full transition"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // محصولات مشابه (همان دسته‌بندی)
  const allProducts = await getProducts();
  const similar = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* مسیر راهنما */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition">صفحه اصلی</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-blue-600 transition">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
          {/* تصویر */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* اطلاعات */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-relaxed mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-amber-400">★★★★★</span>
              <span className="text-sm text-gray-500">
                {product.rating.toLocaleString("fa-IR")} از ۵
              </span>
            </div>

            <p className="text-gray-600 leading-8 mb-6">
              {product.description}
            </p>

            {/* قیمت */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center justify-between mb-6">
              <span className="text-gray-500 text-sm">قیمت نهایی</span>
              <span className="text-2xl font-black text-blue-700">
                {product.price.toLocaleString("fa-IR")}
                <span className="text-sm font-medium mr-1">تومان</span>
              </span>
            </div>

            {/* ★ دکمه‌های اکشن */}
            <AddToCart product={product} />
          </div>
        </div>

        {/* محصولات مشابه */}
        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-extrabold text-gray-800 mb-6">
              محصولات مشابه
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

    </div>
  );
}