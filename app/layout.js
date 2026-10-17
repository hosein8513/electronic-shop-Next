import { getCategories } from "@/services/getProducts";
import "./globals.css";
import { CategoriesProvider } from "@/context/CategoriesContext";
// import store from "@/redux/store";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata = {
  title: "الکترومارکت | فروشگاه لوازم الکترونیکی",
  description: "فروشگاه آنلاین موبایل، لپ‌تاپ و لوازم جانبی",
};

export default async function RootLayout({ children }) {
  // دسته‌بندی‌ها یک بار اینجا دریافت می‌شن
  const categories = await getCategories();

  return (
    <html lang="fa" dir="rtl">
     <body className="bg-gray-50 text-gray-800 antialiased">
  <ReduxProvider>
    <CategoriesProvider categories={categories}>
      {children}
    </CategoriesProvider>
  </ReduxProvider>
</body>
    </html>
  );
}