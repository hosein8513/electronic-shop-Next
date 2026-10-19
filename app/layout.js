import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import Footer from "@/components/Footer";
import { getCategories } from "@/services/getProducts";

export default async function RootLayout({ children }) {
  // دسته‌بندی‌ها یک بار اینجا فچ می‌شوند (سرور کامپوننت)
  const categories = await getCategories();

  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers categories={categories}>
          {/* هدر: بالای همه صفحات */}
          <Header />

          {/* بدنه: ساید‌بار + محتوای هر صفحه */}
          <div className="flex max-w-7xl mx-auto w-full px-4 sm:px-6">
            <SideBar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>

          {/* فوتر: پایین همه صفحات */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}