"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { getAllBanners } from "@/lib/api/homeBanner";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Hero() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBanners();
        setBanners(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section className="home-banner">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
        >
          {banners.map((banner) => (
            <SwiperSlide>
              <div className="wrap relative">
                <img
                  src={banner.image}
                  alt="Slide 1"
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
    </>
  );
}
