import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/Productcard";
import Sidebar from "@/components/SideBar";
import { getProducts } from "@/services/getProducts";

const heroCategories = ["موبایل", "لپ‌تاپ", "لوازم جانبی"];

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* بنر هیرو */}
      <section className="bg-gradient-to-l from-blue-700 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
            دنیای تکنولوژی، یک قدم با شما
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto mb-7 leading-7">
            جدیدترین موبایل‌ها، لپ‌تاپ‌ها و لوازم جانبی با ضمانت اصالت،
            قیمت رقابتی و ارسال سریع
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {heroCategories.map((cat) => (
              <a
                key={cat}
                href="#products"
                className="bg-white/15 hover:bg-white/25 backdrop-blur px-6 py-2.5 rounded-full text-sm font-semibold border border-white/20 transition"
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* بدنه اصلی: سایدبار + کانتنت */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar />

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

      <Footer />
    </div>
  );
}