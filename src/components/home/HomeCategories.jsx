"use client";

import { useCategories } from "@/context/CategoryContext";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomeCategories() {
  const categories = useCategories();

  return (
    <section className="home-category">
      <div className="wrapper">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={2}
          observer={true}
          observeParents={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
        >
          {categories.map((category, idx) => (
            <SwiperSlide key={`${idx}-category-slide`}>
              <Link href={`/product-category/${category.slug}/`}>
                <div className="wrap relative">
                  <Image
                    src={category.image}
                    alt={`Slide ${idx}`}
                    loading="lazy"
                    fill
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="/media/placeholder.jpg"
                  />
                  <div className="text-box">
                    <h2>{category.category_name}</h2>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
