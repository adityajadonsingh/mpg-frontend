"use client";

import { useCategories } from "@/context/CategoryContext";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomeCategories() {
  const categories = useCategories();

  return (
    <section className="home-category">
      <div className="container mx-auto">
        <div className="wrapper">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={5}
            observer={true}
            observeParents={true}
          >
            {categories.map((category, idx) => (
              <SwiperSlide key={`${idx}-category-slide`}>
                <Link href={`/${category.slug}`}>
                  <div className="wrap relative">
                    <Image
                      src={category.image}
                      alt={`Slide ${idx}`}
                      loading="lazy"
                      fill
                      style={{ objectFit: "cover" }}
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
      </div>
    </section>
  );
}
