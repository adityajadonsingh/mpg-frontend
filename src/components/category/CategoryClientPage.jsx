"use client";

import { useCategories } from "@/context/CategoryContext";
import CategoryBanner from "@/components/category/CategoryBanner";
import Breadcrum from "@/components/Breadcrum";
import ProductGrid from "./ProductGrid";

export default function CategoryClientPage({
  categorySlug,
  products,
  breadcrum,
}) {
  const categories = useCategories();

  const categoryDetails = categories.find(
    (cat) => cat.slug.toLowerCase() === categorySlug.toLowerCase()
  );

  return (
    <>
      <CategoryBanner
        name={categoryDetails.category_name}
        image={categoryDetails.image}
        short_des={categoryDetails.short_description}
      />
      <Breadcrum path_arr={breadcrum} />
      <ProductGrid categorySlug={categorySlug} products={products}/>

      {/* <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul> */}
    </>
  );
}
