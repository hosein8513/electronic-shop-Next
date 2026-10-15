import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/Productcard";
import { getCategories, getCategoryProducts } from "@/services/getProducts";



export default async function CategoryPage({ params }) {
  const { name } = await params;
  const category = decodeURIComponent(name);
  const [products, categories] = await Promise.all([
    getCategoryProducts(category),
    getCategories(),
  ]);
   const info = categories.find((c) => c.name === category);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* بنر دسته‌بندی */}
      <section className="bg-gradient-to-l from-blue-700 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <span className="text-5xl block mb-3">{info?.icon || "🛒"}</span>
          <h1 className="text-2xl sm:text-4xl font-black mb-3">
            {info?.title || category}
          </h1>
          <p className="text-blue-100 max-w-xl mx-auto leading-7">
            {info?.description || `محصولات دسته‌بندی ${category}`}
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* مسیر راهنما */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition">صفحه اصلی</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{info?.title || category}</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-800">
            {products.length.toLocaleString("fa-IR")} محصول یافت شد
          </h2>
        </div>

        {/* محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📦</p>
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              فعلاً محصولی در این دسته‌بندی موجود نیست
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              به‌زودی محصولات جدیدی اضافه می‌شوند
            </p>
            <Link
              href="/"
              className="inline-block text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-full transition"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}