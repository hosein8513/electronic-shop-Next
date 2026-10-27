import Link from "next/link";

export default function TermsPage() {
  const rules = [
    {
      title: "۱. حساب کاربری",
      text: "برای ثبت سفارش باید اطلاعات حساب کاربری خود را دقیق و صحیح وارد کنید. مسئولیت حفظ امنیت رمز عبور با شماست. در صورت تغییر اطلاعات (نام، ایمیل، رمز عبور) از صفحه ویرایش پروفایل، اطلاعات جدید بلافاصله جایگزین می‌شود.",
    },
    {
      title: "۲. سفارش و پرداخت",
      text: "ثبت سفارش به معنای پذیرش قیمت و شرایط محصول در لحظه سفارش است. پرداخت از طریق درگاه بانکی امن انجام می‌شود و الکترومارکت هیچ اطلاعات کارتی شما را ذخیره نمی‌کند.",
    },
    {
      title: "۳. ارسال کالا",
      text: "زمان تحویل تقریبی است و بسته به آدرس و شرایط جوی ممکن است کمی متفاوت باشد. مسئولیت صحت آدرس وارد شده با خریدار است.",
    },
    {
      title: "۴. مرجوعی و گارانتی",
      text: "کالای مرجوعی باید سالم، بدون آسیب و با بسته‌بندی کامل باشد. محصولات دارای گارانتی شرکتی هستند و شرایط گارانتی طبق اعلام شرکت واردکننده است.",
    },
    {
      title: "۵. حریم خصوصی",
      text: "اطلاعات کاربران فقط برای انجام فرآیند خرید استفاده می‌شود و در اختیار هیچ شخص ثالثی قرار نمی‌گیرد.",
    },
  ];

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

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl font-black text-gray-800 mb-1">
          📋 قوانین و مقررات
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          استفاده از الکترومارکت به معنای پذیرش قوانین زیر است
        </p>

        <div className="space-y-5">
          {rules.map((rule) => (
            <div key={rule.title}>
              <h2 className="font-black text-blue-700 text-sm mb-1.5">
                {rule.title}
              </h2>
              <p className="text-sm text-gray-600 leading-7">{rule.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}