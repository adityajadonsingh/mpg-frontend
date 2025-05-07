"use client";

import { useState } from "react";
import Image from "next/image";
const categories = [
  "Sandstone Paving",
  "Limestone Paving",
  "Outdoor Porcelain tiles",
  "Cobblestone Paving",
];

const productData = {
  "Sandstone Paving": new Array(8).fill({
    name: "Product Name",
    image:
      "https://mpg-backend-production.up.railway.app/media/categories/Why_Quartz_is_the_Preferred_Choice_for_Surfaces.webp",
  }),
  "Limestone Paving": new Array(8).fill({
    name: "Product Name",
    image:
      "https://mpg-backend-production.up.railway.app/media/categories/How_is_quartz_formed_-_every_thing_you_need_to_know.webp",
  }),
  "Outdoor Porcelain tiles": new Array(8).fill({
    name: "Product Name",
    image:
      "https://mpg-backend-production.up.railway.app/media/categories/Sustainability_and_Quartz.webp",
  }),
  "Cobblestone Paving": new Array(8).fill({
    name: "Product Name",
    image:
      "https://mpg-backend-production.up.railway.app/media/categories/Final_Thoughts.webp",
  }),
};

export default function BestMPG() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  return (
    <>
      <section className="best-home">
        <div className="wrapper overflow-hidden">
          <h2 className="heading uppercase">Best Of MPG Stone</h2>
          {/* Tabs */}
          <div className="flex justify-center space-x-6 tab-buttons">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`pb-1 font-semibold tab-btn ${
                  activeCategory === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 product-grid animate-slide-in transition-all duration-500"
          >
            {productData[activeCategory].map((product, index) => (
              <div key={index} className="text-center">
                <div className="img-box overflow-hidden">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover mb-2 transform transition-all duration-300 hover:scale-105"
                  />
                  <div className="cta">
                    <button className="bg-white px-3 py-2 font-medium text-sm w-full">
                      ENQUIRE NOW
                    </button>
                  </div>
                </div>
                <div className="font-semibold text-lg mt-3">{product.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
