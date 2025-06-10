// app/product-category/[...slug]/page.js

import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";
import CategoryClientPage from "@/components/category/CategoryClientPage";

export default async function CategoryPage({ params }) {
  const param = await params;
  const slugArray = param.slug;

  if (!slugArray || slugArray.length === 0 || slugArray.length === 2) {
    return notFound();
  }

  const category = slugArray[0].toLowerCase();
  let pageIndex = 1;
  // Handle paginated URL like /wall-cladding/page/2
  if (slugArray.length === 3 && slugArray[1] === "page") {
    const rawPage = slugArray[2];
    if (rawPage.startsWith('0')) {
      return notFound();
    }
    // Validate page number (should be a valid number)
    const isValidPage = /^\d+$/.test(rawPage);
    if (!isValidPage) return notFound();

    pageIndex = parseInt(rawPage);
  }

  // If "page" exists but URL structure is not /category/page/number
  if (slugArray.includes("page") && slugArray.length !== 3) {
    return notFound();
  }

  // Fetch and paginate products
  const perPage = 15;
  const allProducts = await getAllProducts("category-all" ,category.replace(/-/g, " "));
  if (!allProducts || allProducts.length === 0) return notFound();
  const totalPages = Math.ceil(allProducts.length / perPage);
  if (pageIndex > totalPages || pageIndex < 1 || isNaN(pageIndex)) {
    return notFound();
  }
console.log(allProducts)
  const start = (pageIndex - 1) * perPage;
  const end = start + perPage;
  const paginatedProducts = allProducts.slice(start, end);

  const slugPath = [
    { slug_name: "Product Categories", slug: "/product-category" },
    { slug_name: category.replace(/-/g, " "), slug: `/product-category/${category}` },
  ];

  return (
    <CategoryClientPage
      categorySlug={category}
      paginatedProducts={paginatedProducts}
      allProducts={allProducts}
      breadcrum={slugPath}
      currentPage={pageIndex}
      totalPages={totalPages}
    />
  );
}
