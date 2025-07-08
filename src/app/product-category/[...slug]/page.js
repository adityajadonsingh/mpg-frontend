import { getAllProducts } from "@/lib/api/products";
import { notFound, redirect } from "next/navigation";
import CategoryClientPage from "@/components/category/CategoryClientPage";

export default async function CategoryPage({ params }) {
  const slugArray = params.slug;

  if (!slugArray || slugArray.length === 0) {
    return notFound();
  }

  let category = "";
  let pageIndex = 1;

  // Valid: /product-category/[category]
  if (slugArray.length === 1) {
    category = slugArray[0].toLowerCase();
  }
  // Valid: /product-category/[category]/page/[page]
  else if (slugArray.length === 3 && slugArray[1] === "page") {
    category = slugArray[0].toLowerCase();

    const rawPage = slugArray[2];

    if (rawPage.startsWith("0")) {
      return notFound();
    }

    const isValidPage = /^\d+$/.test(rawPage);
    if (!isValidPage) return notFound();

    pageIndex = parseInt(rawPage);

    if (pageIndex === 1) {
      return redirect(`/product-category/${category}`);
    }
  }
  // Invalid: anything else
  else {
    return notFound();
  }

  // Fetch products
  const perPage = 15;
  const allProducts = await getAllProducts("category-all", category.replace(/-/g, " "));
  if (!allProducts || allProducts.length === 0) return notFound();

  const totalPages = Math.ceil(allProducts.length / perPage);
  if (pageIndex > totalPages || pageIndex < 1 || isNaN(pageIndex)) {
    return notFound();
  }

  const start = (pageIndex - 1) * perPage;
  const end = start + perPage;
  const paginatedProducts = allProducts.slice(start, end);

  const slugPath = [
    { slug_name: "Product Category", slug: "/product-category" },
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
      isPaginatedPage={pageIndex === 1}
    />
  );
}
