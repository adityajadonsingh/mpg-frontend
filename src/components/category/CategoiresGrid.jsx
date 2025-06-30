"use client";

import { useState, useEffect } from "react";
import { useCategories } from "@/context/CategoryContext";
import CardSlider from "./CardSlider";
import { getAllProducts } from "@/lib/api/products";

// ✅ Simple skeleton placeholder component
function CategorySkeleton({direction = "row"}) {
  console.log(direction)
  return (
    <div className={`animate-pulse flex items-center px-10 gap-8 py-12 flex-${direction}`}>
      {/* Left side (text) */}
      <div className="w-1/2 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
      {/* Right side (slider placeholder) */}
      <div className="w-1/2 h-[300px] bg-gray-200 rounded-lg"></div>
    </div>
  );
}

export default function CategoriesGrid() {
  const categories = useCategories();
  const [categoryArr, setCategoryArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const arr = await Promise.all(
        categories.map(async (item) => ({
          category: item.category_name,
          short_description: item.short_description,
          category_products: await getAllProducts("5", item.category_name),
        }))
      );
      setCategoryArr(arr);
      setIsLoading(false);
    }

    if (categories.length > 0) {
      fetchData();
    }
  }, [categories]);

  const bgColors = [
    "bg-[#f9f9f9]",
    "bg-[#f0f9ff]",
    "bg-[#fefce8]",
    "bg-[#f0fdf4]",
    "bg-[#fff7ed]",
    "bg-[#fdf2f8]",
    "bg-[#f3f4f6]",
  ];

  return (
    <section className="category-grid min-h-[600px]">
      {isLoading ? (
        <>
          {/* Skeletons while loading */}
          <CategorySkeleton />
          <CategorySkeleton direction={"row-reverse"} />
          <CategorySkeleton />
        </>
      ) : (
        categoryArr.map((catObj, index) => {
          const bgColor = bgColors[index % bgColors.length];

          return (
            <div
              key={catObj.category}
              className={`category-part flex items-center ${
                index % 2 !== 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="content w-1/2">
                <h2 className="text-3xl mb-4 font-semibold capitalize">
                  {catObj.category}
                </h2>
                <p>{catObj.short_description}</p>
              </div>
              <div className={`cards-slider w-1/2 ${bgColor}`}>
                <CardSlider products={catObj.category_products} />
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}
