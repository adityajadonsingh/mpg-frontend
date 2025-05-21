import ProductClientPage from "@/components/product/ProductClientPage";
import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";

// app/[category]/[product]/page.js
export default async function ProductDetail({ params }) {
  const { category, product } = await params;
  const productDetails = await getAllProducts(product, null);
  const relatedProducts = await getAllProducts("10", category.replace("-", " "));
  if (!productDetails || productDetails.length === 0) return notFound();
  // You can fetch product detail from API using product slug
  return <ProductClientPage product = {productDetails[0]} relatedProducts={relatedProducts}/>;
}
