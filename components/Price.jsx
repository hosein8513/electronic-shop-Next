export default function Price({ product, size = "md" }) {
  const price = product.price;
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount
    ? Math.round(price * (1 - discount / 100))
    : price;

  // اندازه‌ها: sm برای کاردها، lg برای صفحه اختصاصی محصول
  const sizes = {
    sm: {
      final: "text-base",
      original: "text-xs",
      badge: "text-xs px-2 py-0.5",
    },
    md: {
      final: "text-lg",
      original: "text-sm",
      badge: "text-xs px-2.5 py-1",
    },
    lg: {
      final: "text-2xl sm:text-3xl",
      original: "text-base",
      badge: "text-sm px-3 py-1.5",
    },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div>
      {hasDiscount ? (
        <div className="flex items-center gap-2 flex-wrap">
          {/* بج درصد تخفیف */}
          <span
            className={`bg-gradient-to-l from-orange-500 to-rose-500 text-white font-black rounded-full shadow-sm shadow-orange-200 ${s.badge}`}
          >
            ٪{discount.toLocaleString("fa-IR")}
          </span>
          {/* قیمت اصلی خط‌خورده */}
          <span className={`text-gray-400 line-through ${s.original}`}>
            {price.toLocaleString("fa-IR")}
          </span>
        </div>
      ) : null}

      {/* قیمت نهایی */}
      <p
        className={`font-black mt-1 ${
          hasDiscount ? "text-orange-600" : "text-blue-700"
        } ${s.final}`}
      >
        {finalPrice.toLocaleString("fa-IR")}
        <span className="text-xs font-bold text-gray-500 mr-1">تومان</span>
      </p>
    </div>
  );
}