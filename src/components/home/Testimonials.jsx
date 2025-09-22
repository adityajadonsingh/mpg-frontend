"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";



export default function Testimonials({testimonials}) {
  return (
    <section className="testimonials">
      <div className="wrapper mx-auto">
        <h2 className="heading mb-6 capitalize">Loved by Businesses and
        Individuals across the globe</h2>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((single, idx) => (
            <SwiperSlide key={`${idx}-testimonial-slide`} className="h-full">
              <div className="box bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between min-h-[300px]">
                {/* Rating Stars */}
                <div className="stars flex mb-2 text-orange-400">
                  {Array.from({ length: single.rating }).map((_, i) => (
                    <span className="text-2xl" key={i}>★</span>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 text-sm mb-4">{single.testimonial}</p>

                {/* Profile Footer */}
                <div className="profile flex items-center gap-3 mt-auto pt-4 border-t border-[#c9c9c9]">
                  <img
                    src={single.profile_image}
                    alt={single.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{single.name}</p>
                    {single.verified && (
                      <p className="text-xs text-orange-500">✔ Verified</p>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
