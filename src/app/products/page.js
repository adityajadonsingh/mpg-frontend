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
        robots: pageMetaData.robots_tag,
      };
}

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
