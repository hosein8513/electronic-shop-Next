import ProductCard from "@/components/Productcard";
import HeroBanner from "@/components/HeroBanner";
import { getProducts } from "@/services/getProducts";

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
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              مشاهده همه ←
            </a>
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