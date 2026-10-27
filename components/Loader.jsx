export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50/95 to-white backdrop-blur-sm">
      {/* حلقه چرخان */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20">
        {/* حلقه بیرونی */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
        {/* حلقه چرخان گرادیانی */}
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-l-cyan-500 animate-spin"
          style={{ animationDuration: "0.8s" }}
        ></div>
        {/* آیکون وسط */}
        <span className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl">
          ⚡
        </span>
      </div>

      {/* متن */}
      <p className="mt-6 text-sm sm:text-base font-bold text-gray-600">
        در حال بارگذاری...
      </p>
      <p className="mt-1 text-xs text-gray-400">لطفاً چند لحظه صبر کنید</p>

      {/* سه نقطه انیمیشنی */}
      <div className="flex items-center gap-1.5 mt-4">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
        <span
          className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>
    </div>
  );
}