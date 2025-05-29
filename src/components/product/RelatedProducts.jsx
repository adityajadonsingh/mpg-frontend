"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function RelatedProducts({ relatedProducts }) {
  return (
    <>
      <section className="related-products">
        <div className="wrapper">
          <h2 className="heading mb-6 capitalize">Related Products</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="product-grid"
          >
            {relatedProducts.map((product, idx) => {
              return (
                <SwiperSlide key={`${idx}-product-slide`} className="h-full">
                  <div
                    className="card w-full relative z-0"
                    key={`product-${idx}`}
                  >
                    <a
                      className="block w-full h-full"
                      href={`/product-category/${product.category.replace(" ","-").toLowerCase()}/${product.slug}`}
                    >
                      <div className="card-wrap w-full h-full relative">
                        <div className="read-more">
                          <i className="bi bi-bag mr-2"></i>
                          <span>Know More</span>
                        </div>
                        <Image
                          alt={product.name}
                          src={product.image}
                          fill
                          style={{ objectFit: "cover" }}
                          className="z-10 h-full w-full bg-[#ebedf0]"
                          placeholder="blur"
                          blurDataURL="/media/placeholder.jpg"
                        />
                        <span className="z-20 absolute prod-name">
                          {product.name}
                        </span>
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
}
// {testimonials.map((single, idx) => (
//   <SwiperSlide key={`${idx}-testimonial-slide`} className="h-full">
//     <div className="box bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between min-h-[300px]">
//       {/* Rating Stars */}
//       <div className="stars flex mb-2 text-orange-400">
//         {Array.from({ length: single.rating }).map((_, i) => (
//           <span className="text-2xl" key={i}>
//             ★
//           </span>
//         ))}
//       </div>

//       {/* Title */}
//       <h3 className="font-semibold text-lg mb-2">{single.title}</h3>

//       {/* Testimonial Text */}
//       <p className="text-gray-600 text-sm mb-4">
//         {single.testimonial}
//       </p>

//       {/* Profile Footer */}
//       <div className="profile flex items-center gap-3 mt-auto pt-4 border-t border-[#c9c9c9]">
//         <img
//           src={single.profile_image}
//           alt={single.name}
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <p className="font-semibold text-sm">{single.name}</p>
//           {single.verified && (
//             <p className="text-xs text-orange-500">✔ Verified</p>
//           )}
//         </div>
//       </div>
//     </div>
//   </SwiperSlide>
// ))}
