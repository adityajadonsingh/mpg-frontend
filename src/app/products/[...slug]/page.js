import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";
import AllProductsClientPage from "@/components/product/AllProductsClientPage";
import { getPageMetaData } from "@/lib/api/pagesMetaData";

export async function generateMetadata() {
  const pageMetaData = await getPageMetaData("products");

  return {
    title: pageMetaData.meta_title,
    description: pageMetaData.meta_description,
    keywords: pageMetaData.meta_keywords,
    openGraph: {
      title: pageMetaData.og_title || pageMetaData.meta_title,
      description: pageMetaData.og_descriptions || pageMetaData.meta_description,
      url: pageMetaData.canonical_url,
      images: pageMetaData.meta_image,
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone"
    },
    twitter: {
      title: pageMetaData.twitter_title || pageMetaData.meta_title,
      description: pageMetaData.twitter_description || pageMetaData.meta_description,
      images: pageMetaData.meta_image
    },
    alternates: {
      canonical: pageMetaData.canonical_url || "",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

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
  const allProducts = await getAllProducts("all", "all");
  if (!allProducts || allProducts.length === 0) return notFound();

  const totalPages = Math.ceil(allProducts.length / perPage);
  if (pageIndex > totalPages || pageIndex < 1 || isNaN(pageIndex)) {
    return notFound();
  }

  const start = (pageIndex - 1) * perPage;
  const end = start + perPage;
  const paginatedProducts = allProducts.slice(start, end);

  const slugPath = [
    { slug_name: "Products", slug: "/products/" },
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
