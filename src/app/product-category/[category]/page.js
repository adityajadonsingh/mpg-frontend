import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";
import CategoryClientPage from "@/components/category/CategoryClientPage";



export default async function CategoryPage({ params }) {
  const { category } = await params;
  const slugPath = [
    {
        slug_name : "Product Categories",
        slug : "/product-category"
    },
    {
      slug_name : category.replace(/-/g, " "),
      slug: category
    }
]

  const products = await getAllProducts(category.replace(/-/g, " "));

  if (products.length === 0) {
    notFound();
  }

  return <CategoryClientPage categorySlug={category} products={products} breadcrum={slugPath} />;
}
