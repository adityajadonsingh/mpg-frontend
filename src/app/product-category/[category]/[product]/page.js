import ProductClientPage from "@/components/product/ProductClientPage";
import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const allProducts = await getAllProducts("all", "all-category");
  return allProducts.map((product) => {
    let categorySlug = product.category.replace(/ /g, "-").toLowerCase();
    return {
      category: categorySlug,
      product: product.slug,
    }
  });
}
export const revalidate = 60;
export default async function ProductDetail({ params }) {
  const { category, product } = await params;

  // Fetch product detail
  const productDetails = await getAllProducts(product, null);
  // ❗ Check immediately if not found
  if (!productDetails || productDetails.length === 0) {
    return notFound();
  }

  // Fetch related only if product exists
  const fetchRelatedProducts = await getAllProducts("10", category.replace("-", " "));
  const relatedProducts = fetchRelatedProducts.filter(
    (prod) => prod.name !== productDetails[0].name
  );

  return (
    <ProductClientPage
      product={productDetails[0]}
      relatedProducts={relatedProducts}
    />
  );
}


export async function generateMetadata({ params }) {
  const { category, product } = await params;
  const [productDetails] = await getAllProducts(product, null);

  return {
    title: productDetails.meta_title,
    description: productDetails.meta_description,
    keywords: productDetails.meta_keywords,
    openGraph: {
      title: productDetails.og_title || productDetails.meta_title,
      description: productDetails.og_descriptions || productDetails.meta_description,
      url: productDetails.canonical_url,
      images: productDetails.meta_image,
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone"
    },
    twitter: {
      title: productDetails.twitter_title || productDetails.meta_title,
      description: productDetails.twitter_description || productDetails.meta_description,
      images: productDetails.meta_image
    },
    alternates: {
      canonical: productDetails.canonical_url || "",
    },
    robots: productDetails.robots_tag,
  };
}