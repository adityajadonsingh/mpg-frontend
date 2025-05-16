import ProductClientPage from "@/components/product/ProductClientPage";
import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";

// app/[category]/[product]/page.js
export default async function ProductDetail({ params }) {
  const { category, product } = await params;
  const productDetails = await getAllProducts(product, null);
  
  if (!productDetails || productDetails.length === 0) return notFound();
  // You can fetch product detail from API using product slug
  return <ProductClientPage product = {productDetails[0]}/>;
}
