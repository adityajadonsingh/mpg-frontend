"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HomeCategories.css";

export default function HomeCategories({categories}) {

  return (
    <section className="home-category">
      <div className="wrapper">
        <h2 className="heading uppercase mb-4">Our Top Categories</h2>
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
            <SwiperSlide key={`${idx}-category-slide`} className="swiper-slide-skeleton">
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
                    <span>{category.category_name}</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <SwiperSlide className="swiper-slide-skeleton">
              <Link href={`/product-category/`}>
                <div className="wrap relative">
                  <Image
                    src={categories[2].image}
                    alt={categories[2].category_name}
                    loading="lazy"
                    fill
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="/media/placeholder.jpg"
                  />
                  <div className="text-box backdrop-blur-xs flex justify-center items-center">
                    <span className="mb-1">Explore More </span>
                    <i className="bi bi-chevron-compact-right text-3xl"></i>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
