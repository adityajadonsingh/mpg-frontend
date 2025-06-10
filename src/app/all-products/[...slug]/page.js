import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";
import AllProductsClientPage from "@/components/product/AllProductsClientPage";

export default async function AllProductPage({ params }) {
  const slugArray = params.slug || [];

  // URL: /all-products
  if (slugArray.length === 0) {
    return await renderPage(1);
  }

  // URL: /all-products/page/2
  if (slugArray.length === 2 && slugArray[0] === "page") {
    const rawPage = slugArray[1];

    if (rawPage.startsWith("0") || !/^\d+$/.test(rawPage)) {
      return notFound();
    }

    const pageIndex = parseInt(rawPage, 10);
    return await renderPage(pageIndex);
  }

  // Invalid URL
  return notFound();
}

async function renderPage(pageIndex) {
  const perPage = 15;
  const allProducts = await getAllProducts("all", "all"); // Adjust your key if needed
  console.log(allProducts)
  if (!allProducts || allProducts.length === 0) return notFound();

  const totalPages = Math.ceil(allProducts.length / perPage);
  if (pageIndex > totalPages || pageIndex < 1 || isNaN(pageIndex)) {
    return notFound();
  }

  const start = (pageIndex - 1) * perPage;
  const end = start + perPage;
  const paginatedProducts = allProducts.slice(start, end);

  const slugPath = [
    { slug_name: "All Products", slug: "/all-products" },
  ];

  return (
    <AllProductsClientPage
      categorySlug="all"
      paginatedProducts={paginatedProducts}
      allProducts={allProducts}
      breadcrum={slugPath}
      currentPage={pageIndex}
      totalPages={totalPages}
    />
  );
}
