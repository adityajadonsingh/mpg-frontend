"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination } from "swiper/modules";

import Image from "next/image";
import { useRef, useEffect } from "react";

export default function CardSlider({products}) {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const slides = [
    {
      id: 1,
      name: "Beautiful Mountain",
      image: "/media/all-category.png",
      link: "/category/mountain",
    },
    {
      id: 2,
      name: "Sunny Beach",
      image: "/media/all-category.png",
      link: "/category/beach",
    },
    {
      id: 3,
      name: "City Lights",
      image: "/media/all-category.png",
      link: "/category/city",
    },
    {
      id: 4,
      name: "Green Forest",
      image: "/media/all-category.png",
      link: "/category/forest",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          swiperRef.current?.autoplay.start();
        } else {
          swiperRef.current?.autoplay.stop();
        }
      },
      {
        threshold: 0.1, // Adjust if needed
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-[280px] mx-auto cat-swiper">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Autoplay, Pagination]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        {products.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={`/product-category/${slide.category.toLowerCase().replace(" ", "-")}/${slide.slug}`} className="block">
              <div className="relative w-[280px] h-[300px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={slide.image}
                  alt={slide.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute capitalize bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                  {slide.name}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
