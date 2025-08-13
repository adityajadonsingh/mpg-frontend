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
                priority
                className="z-10 h-full w-full bg-[#ebedf0]"
                placeholder="blur"
                blurDataURL="/media/placeholder.jpg"
              />
              <div className="content-box">
                <h1>{banner.title}</h1>
                <p>{banner.subtitle}</p>
                <a href="#contactForm">
                  <button>Enquire Now</button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
