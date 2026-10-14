import "./globals.css";

export const metadata = {
  title: "الکترومارکت | فروشگاه لوازم الکترونیکی",
  description: "فروشگاه آنلاین موبایل، لپ‌تاپ و لوازم جانبی",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}