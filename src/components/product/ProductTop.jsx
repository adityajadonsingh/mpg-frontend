"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default function ProductTop({
  gallery,
  productName,
  productDescription,
  path_arr
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section className="product-top">
      <div className="wrapper">
        <div className="flex gap-x-10">
          {/* Swiper Gallery */}
          <div className="img-box w-2/5">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="main-swiper mb-4"
            >
              {gallery.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={item.image}
                      alt={item.alt_text || productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress
              modules={[Thumbs]}
              className="thumb-swiper"
            >
              {gallery.map((item, index) => (
                <SwiperSlide key={`thumb-${index}`}>
                  <div className="relative w-full h-[100px] cursor-pointer">
                    <Image
                      src={item.image}
                      alt={item.alt_text || productName}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Content */}
          <div className="product-content w-3/5 flex flex-col justify-between">
            <div className="context">
              <div className="breadcrum">
                <ul className="flex space-x-2">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  {path_arr.map((path, idx) => (
                    <li key={`bread-${idx}`}>
                      {/* <span>/</span> */}
                      <Link href={path.slug}>{path.slug_name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <h1 className="text-2xl font-semibold mt-2">{productName}</h1>
              <p className="mt-2 text-gray-700">{productDescription}</p>
            </div>
            <button className="enquire-btn w-fit mt-4 px-4 py-2 bg-black text-white rounded">
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
