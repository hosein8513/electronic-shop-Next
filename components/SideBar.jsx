"use client";

const categories = [
  { name: "موبایل", icon: "📱", count: 128 },
  { name: "لپ‌تاپ", icon: "💻", count: 76 },
  { name: "لوازم جانبی", icon: "🎧", count: 234 },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* اورلی موبایل */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed lg:sticky top-16 lg:top-20 right-0 z-50 lg:z-0 h-[calc(100vh-4rem)] w-72 shrink-0
          bg-white border-l border-gray-200 p-5 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-gray-800">دسته‌بندی‌ها</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            aria-label="بستن منو"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-1.5">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`#category-${cat.name}`}
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-700
                hover:bg-gradient-to-l hover:from-blue-50 hover:to-cyan-50 hover:text-blue-700
                border border-transparent hover:border-blue-100 transition group"
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{cat.icon}</span>
                {cat.name}
              </span>
              <span className="text-xs bg-gray-100 group-hover:bg-blue-100 text-gray-500 group-hover:text-blue-700 px-2 py-0.5 rounded-full transition">
                {cat.count}
              </span>
            </a>
          ))}
        </nav>

        {/* بنر تخفیف */}
        <div className="mt-8 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-5 text-white shadow-lg shadow-blue-200">
          <p className="text-sm font-bold mb-1">🔥 حراج پاییزه</p>
          <p className="text-xs text-blue-100 leading-6">
            تا ۴۰٪ تخفیف روی لوازم جانبی منتخب
          </p>
          <button className="mt-3 w-full bg-white/20 hover:bg-white/30 backdrop-blur text-xs font-semibold py-2 rounded-lg transition">
            مشاهده تخفیف‌ها
          </button>
        </div>
      </aside>
    </>
  );
}