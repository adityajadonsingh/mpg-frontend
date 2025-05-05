import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CategoryProvider } from "@/context/CategoryContext";
import { getAllCategories } from "@/lib/api/categories";

export const metadata = {
  title: "MPG Stone",
  description: "Informative website for stone products",
};

export default async function RootLayout({ children }) {
  const categories = await getAllCategories();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <CategoryProvider categories={categories}>
          <Header />
          <main>{children}</main>
          <Footer />
        </CategoryProvider>
      </body>
    </html>
  );
}
