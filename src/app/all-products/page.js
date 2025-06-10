import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";
import AllProductsClientPage from "@/components/product/AllProductsClientPage";

export default async function AllProductsDefaultPage() {
  const pageIndex = 1;
  const perPage = 15;

  const allProducts = await getAllProducts("all", "all"); 
  console.log(allProducts)
  if (!allProducts || allProducts.length === 0) return notFound();

  const totalPages = Math.ceil(allProducts.length / perPage);
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
