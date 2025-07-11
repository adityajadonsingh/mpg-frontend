import ProductClientPage from "@/components/product/ProductClientPage";
import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { category, product } = await params;
  console.log(category, product)

  // return {
  //   title: categoryData[0].meta_title,
  //   description: categoryData[0].meta_description,
  //   keywords: categoryData[0].meta_keywords,
  //   openGraph: {
  //     title: categoryData[0].og_title || categoryData[0].meta_title,
  //     description: categoryData[0].og_description || categoryData[0].meta_description,
  //     url: categoryData[0].canonical_url,
  //     images: categoryData[0].meta_image,
  //     type: "website",
  //     locale: "en_US",
  //     siteName: "MPG Stone"
  //   },
  //   twitter: {
  //     title: categoryData[0].twitter_title || categoryData[0].meta_title,
  //     description: categoryData[0].twitter_description || categoryData[0].meta_description,
  //     images: categoryData[0].meta_image
  //   },
  //   alternates: {
  //     canonical: categoryData[0].canonical_url || "",
  //   },
  //   robots: categoryData[0].robots_tag,
  // };
}

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
