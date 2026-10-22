import ProductCard from "@/components/Productcard";
import HeroBanner from "@/components/HeroBanner";
import { getProducts } from "@/services/getProducts";
import Link from "next/link";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      

      <HeroBanner />

      {/* بدنه اصلی: سایدبار + کانتنت */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        

        <main id="products" className="flex-1 px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">
              محصولات منتخب
            </h2>
           <Link
  href="/products"
  className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-white bg-blue-50 hover:bg-gradient-to-l hover:from-blue-600 hover:to-cyan-500 border border-blue-200 rounded-full px-6 py-2.5 shadow-sm transition active:scale-95"
>
  مشاهده همه
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
  </svg>
</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>

      
    </div>
  );
}