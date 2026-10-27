import Link from "next/link";
import Price from "./Price";

export default function ProductCard({ product }) {
  return (
    <article className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* تصویر */}
      <Link href={`/products/${product.id}`} className="relative aspect-[4/3] bg-gray-100 overflow-hidden block">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">
          {product.category}
        </span>
      </Link>

      {/* محتوا */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 leading-6 line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-4">
          <span className="text-amber-400 text-sm">★</span>
          <span className="text-xs text-gray-500 font-medium">
            {product.rating.toLocaleString("fa-IR")}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
         <Price product={product}/>
          <Link
            href={`/products/${product.id}`}
            className="text-xs font-semibold text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-4 py-2 rounded-full transition active:scale-95"
          >
            ادامه مطلب ←
          </Link>
        </div>
      </div>
    </article>
  );
}