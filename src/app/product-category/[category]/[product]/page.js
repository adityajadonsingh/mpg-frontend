import ProductClientPage from "@/components/product/ProductClientPage";
import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";

// ✅ Static paths for SSG
export async function generateStaticParams() {
  const allProducts = await getAllProducts("all", "all-category");

  return allProducts.map((product) => {
    const categorySlug = product.category.replace(/ /g, "-").toLowerCase();
    return {
      category: categorySlug,
      product: product.slug,
    };
  });
}

// ✅ Optional revalidation interval (ISR)
export const revalidate = 60;

// ✅ Product Detail Page Component
export default async function ProductDetail({ params }) {
  const { category, product } = params;

  // 1. Fetch product detail using slug
  const productDetails = await getAllProducts(product, null);

  // 2. If not found => 404
  if (!productDetails || productDetails.length === 0) {
    return notFound();
  }

  const productData = productDetails[0];

  // 3. Normalize actual category slug from product data
  const actualCategorySlug = productData.category.replace(/ /g, "-").toLowerCase();

  // 4. If URL category doesn't match actual category => 404
  if (category !== actualCategorySlug) {
    return notFound();
  }

  // 5. Fetch related products from same category
  const fetchRelatedProducts = await getAllProducts("10", productData.category);
  const relatedProducts = fetchRelatedProducts.filter(
    (prod) => prod.name !== productData.name
  );

  return (
    <ProductClientPage
      product={productData}
      relatedProducts={relatedProducts}
    />
  );
}

// ✅ Metadata generation for SEO
export async function generateMetadata({ params }) {
  const { category, product } = params;
  const [productDetails] = await getAllProducts(product, null);

  // ❗ If product not found, return minimal metadata
  if (!productDetails) {
    return {
      title: "Product Not Found",
    };
  }

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
      siteName: "MPG Stone",
    },
    twitter: {
      title: productDetails.twitter_title || productDetails.meta_title,
      description: productDetails.twitter_description || productDetails.meta_description,
      images: productDetails.meta_image,
    },
    alternates: {
      canonical: productDetails.canonical_url || "",
    },
    robots: productDetails.robots_tag,
  };
}
