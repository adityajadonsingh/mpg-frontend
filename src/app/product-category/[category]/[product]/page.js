import ProductClientPage from "@/components/product/ProductClientPage";
import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }) {
  const { category, product } = params;

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
