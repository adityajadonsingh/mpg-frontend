import { getAllProducts } from "@/lib/api/products";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const products = await getAllProducts();

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.replace(/-/g, " ").toLowerCase()
  );

  if (filteredProducts.length === 0) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold capitalize">
        Category: {category.replaceAll("-", " ")}
      </h1>

      {/* Example: Show product names */}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
