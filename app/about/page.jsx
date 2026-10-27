import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-8 max-w-3xl mx-auto">
      {/* دکمه بازگشت */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-700 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-full px-4 py-2 mb-6 shadow-sm transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        بازگشت به صفحه اصلی
      </Link>

      {/* هدر */}
      <div className="bg-gradient-to-l from-blue-600 to-cyan-500 rounded-3xl px-6 py-10 text-white text-center shadow-lg shadow-blue-200">
        <span className="text-5xl">⚡</span>
        <h1 className="text-2xl sm:text-3xl font-black mt-3">درباره الکترومارکت</h1>
        <p className="text-sm sm:text-base text-blue-100 mt-2">
          فروشگاه آنلاین لوازم الکترونیکی — سریع، مطمئن و مقرون‌به‌صرفه
        </p>
      </div>

      {/* متن معرفی */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mt-6 leading-8 text-gray-700 text-sm sm:text-base">
        <p>
          <strong className="text-gray-900">الکترومارکت</strong> یک فروشگاه آنلاین
          تخصصی در حوزه لوازم الکترونیکی است که با هدف ساده‌تر کردن خرید دیجیتال
          برای کاربران فارسی‌زبان راه‌اندازی شده است. ما تلاش می‌کنیم جدیدترین
          محصولات — از گوشی و لپ‌تاپ گرفته تا لوازم جانبی — را با قیمتی منصفانه و
          توضیحات کامل در اختیارتان قرار دهیم.
        </p>
        <p className="mt-4">
          تجربه خرید در الکترومارکت کاملاً فارسی و راست‌به‌چپ طراحی شده؛ از جستجوی
          زنده و دسته‌بندی دقیق محصولات گرفته تا سبد خرید سریع و پیگیری راحت
          سفارش‌ها.
        </p>
      </div>

      {/* ارزش‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          { icon: "🚀", title: "ارسال سریع", text: "تحویل کوتاه به سراسر کشور" },
          { icon: "✅", title: "اصالت کالا", text: "همه محصولات اورجینال با گارانتی" },
          { icon: "💬", title: "پشتیبانی واقعی", text: "پاسخگویی سریع به سوالات شما" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md transition"
          >
            <span className="text-3xl">{item.icon}</span>
            <p className="font-black text-gray-800 mt-2 text-sm">{item.title}</p>
            <p className="text-xs text-gray-500 mt-1">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}