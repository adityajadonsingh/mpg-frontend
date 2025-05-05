"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroClient({ banners }) {
  return (
    <section className="home-banner">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="wrap relative">
              <Image
                width={800}
                height={500}
                src={banner.image}
                alt={banner.title}
                loading="lazy"
              />
              <div className="content-box">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
                <button>Enquire Now</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
