"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const categories = [
  "Sandstone Paving",
  "Limestone Paving",
  "Outdoor Porcelain tiles",
  "Cobblestone Paving",
];

const productData = {
  "Sandstone Paving": new Array(5).fill({
    name: "Product Name",
    image:
      "https://mpg-backend-production.up.railway.app/media/categories/Why_Quartz_is_the_Preferred_Choice_for_Surfaces.webp",
  }),
  "Limestone Paving": new Array(5).fill({
    name: "Product Name",
    image:
      "https://mpg-backend-production.up.railway.app/media/categories/How_is_quartz_formed_-_every_thing_you_need_to_know.webp",
  }),
  "Outdoor Porcelain tiles": new Array(5).fill({
    name: "Product Name",
    image:
      "https://mpg-backend-production.up.railway.app/media/categories/Sustainability_and_Quartz.webp",
  }),
  "Cobblestone Paving": new Array(5).fill({
    name: "Product Name",
    image:
      "https://mpg-backend-production.up.railway.app/media/categories/Final_Thoughts.webp",
  }),
};

export default function BestMPG() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section className="best-home">
      <div className="wrapper overflow-hidden">
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

        {/* Swiper for Products */}
        <div className="mt-6">
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
            {productData[activeCategory].map((product, index) => (
              <SwiperSlide key={index}>
                <div className="text-center">
                  <div className="img-box overflow-hidden relative w-full aspect-[4/3]">
                    <Image
                      fill
                      src={product.image}
                      alt={product.name}
                      style={{ objectFit: "cover" }}
                      className="object-cover mb-2 transition-all duration-300 hover:scale-105"
                    />
                    <div className="cta absolute bottom-0 left-0 right-0">
                      <button className="bg-white px-3 py-2 font-medium text-sm w-full">
                        ENQUIRE NOW
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold md:text-lg text-md mt-3">{product.name}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
