import { getAllProducts } from "@/lib/api/products";
import { notFound, redirect } from "next/navigation";
import CategoryClientPage from "@/components/category/CategoryClientPage";
import { getAllCategories } from "@/lib/api/categories";

export async function generateStaticParams() {
  const allCategories = await getAllCategories();

  const allParams = [];

  for (const category of allCategories) {
    allParams.push({ slug: [category.slug] });

    const allProducts = await getAllProducts("category-all", category.slug);
    const perPage = 15;
    const totalPages = Math.ceil(allProducts.length / perPage);

    for (let page = 2; page <= totalPages; page++) {
      allParams.push({ slug: [category.slug, "page", page.toString()] });
    }
  }

  return allParams;
}

export const revalidate = 60;



export default async function CategoryPage({ params }) {
  const parmasArray = await params;
  const slugArray = parmasArray.slug;
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
    { slug_name: "Product Category", slug: "/product-category/" },
    { slug_name: category.replace(/-/g, " "), slug: `/product-category/${category}` },
  ];
  const allCategories = await getAllCategories();

  return (
    <>
      <CategoryClientPage
        categorySlug={category}
        paginatedProducts={paginatedProducts}
        allProducts={allProducts}
        breadcrum={slugPath}
        currentPage={pageIndex}
        totalPages={totalPages}
        isPaginatedPage={pageIndex === 1}
      />

    </>
  );
}


export async function generateMetadata({ params }) {
  const sparams = await params;
  const slugArray = sparams.slug;

  const categorySlug = slugArray[0];
  const isPaginatedPage = slugArray.length === 3 && slugArray[1] === "page";

  const categoriesData = await getAllCategories();
  const categoryData = categoriesData.find((category) => category.slug === categorySlug);

  if (!categoryData) return {};

  return {
    title: categoryData.meta_title,
    description: categoryData.meta_description,
    keywords: categoryData.meta_keywords,
    openGraph: {
      title: categoryData.og_title || categoryData.meta_title,
      description: categoryData.og_description || categoryData.meta_description,
      url: categoryData.canonical_url,
      images: categoryData.meta_image,
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone"
    },
    twitter: {
      title: categoryData.twitter_title || categoryData.meta_title,
      description: categoryData.twitter_description || categoryData.meta_description,
      images: categoryData.meta_image
    },
    alternates: {
      canonical: categoryData.canonical_url || "",
    },
    robots: isPaginatedPage ? "noindex, follow" : categoryData.robots_tag,
  };
}
