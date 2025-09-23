"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/api/products";

const categories = [
  "Cobblestone paving",
  "Granite Slabs",
  "Kerb Stone",
  "Porcelain Slabs",
];

export default function BestMPG() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true); // start with loading true

  useEffect(() => {
    async function fetchProducts(category) {
      try {
        const data = await getAllProducts("5", category);
        setProductData((prev) => ({
          ...prev,
          [category]: data?.slice(0, 4) || [], // only take first 4
        }));
      } catch (err) {
        console.error("Error fetching products:", err);
        setProductData((prev) => ({ ...prev, [category]: [] }));
      } finally {
        setLoading(false);
      }
    }

    // fetch for first category on mount
    if (!productData[activeCategory]) {
      fetchProducts(activeCategory);
    }
  }, [activeCategory]);

  const products = productData[activeCategory] || [];
  const isFirstLoad = loading && products.length === 0;

  return (
    <section className="best-home relative">
      <Image
        src="/media/bg-img.webp"
        fill
        className="z-0"
        alt="Best of MPG Stones"
      />

      <div className="wrapper overflow-hidden relative z-10">
        <h2 className="heading uppercase">Best Of MPG Stone</h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 tab-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-semibold tab-btn ${
                activeCategory === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6 relative min-h-[250px]">
          {/* Spinner overlay */}
          {products.length > 0 && loading && (
            <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center">
              <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Skeleton (first time loading) */}
          {isFirstLoad ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-[200px] bg-gray-200 rounded-md animate-pulse"
                  />
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product, index) => (
                <Link
                  key={index}
                  href={`/product-category/${product.category
                    .replace(/ /g, "-")
                    .toLowerCase()}/${product.slug}/`}
                >
                  <div className="text-center">
                    <div className="img-box overflow-hidden rounded-sm shadow-md hover:shadow-sm relative w-full aspect-[4/3]">
                      <Image
                        fill
                        src={product.image || "/media/placeholder.jpg"}
                        alt={product.name}
                        style={{ objectFit: "cover" }}
                        className="object-cover mb-2 transition-all duration-300 hover:scale-105 z-10 h-full w-full bg-[#ebedf0]"
                        placeholder="blur"
                        blurDataURL="/media/placeholder.jpg"
                      />
                      <div className="cta absolute bottom-0 left-0 right-0 z-10">
                        <button className="bg-white px-3 py-2 font-medium text-sm w-full">
                          ENQUIRE NOW
                        </button>
                      </div>
                    </div>
                    <div className="font-semibold md:text-lg text-md mt-3 capitalize">
                      {product.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
