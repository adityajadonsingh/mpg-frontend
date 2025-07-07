"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const hasData = !!productData[activeCategory];
      if (!hasData) setLoading(true);

      try {
        const data = await getAllProducts("10", activeCategory);
        setProductData((prev) => ({
          ...prev,
          [activeCategory]: data || [],
        }));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeCategory]);

  const products = productData[activeCategory] || [];
  const isFirstLoad = !productData[activeCategory] && loading;

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
          {/* Spinner overlay (only when switching category after first load) */}
          {products.length > 0 && loading && (
            <div className="absolute inset-0 z-10 bg-white/60 flex items-center justify-center">
              <div className="loader w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Skeleton (first time loading) */}
          {isFirstLoad ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <Swiper
              key={activeCategory}
              modules={[Navigation]}
              navigation
              spaceBetween={15}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {products.map((product, index) => {

                return (
                  <SwiperSlide key={index}>
                    <Link href={`/product-category/${product.category.replace(" ", "-").toLowerCase()}/${product.slug}/`}>
                      <div className="text-center">
                        <div className="img-box overflow-hidden rounded-sm shadow-md hover:shadow-sm relative w-full aspect-[4/3]">
                          <Image
                            fill
                            src={product.image}
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
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
