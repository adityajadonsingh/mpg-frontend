"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import ContactPopupForm from "@/components/ContactPopupForm";
import Popup from "@/components/Popup";

export default function ProductTop({
  gallery,
  productName,
  productDescription,
  path_arr,
}) {
  const [popupMessage, setPopupMessage] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {popupMessage && (
        <Popup
          message={popupMessage}
          duration={3000}
          onClose={() => setPopupMessage("")}
        />
      )}
      <section className="product-top">
        <div className="wrapper">
          <div className="flex gap-x-10 lg:flex-nowrap flex-wrap gap-y-10 justify-center">
            {/* Swiper Gallery */}
            <div className="img-box lg:w-2/5 md:w-3/5 w-full">
              <div className="breadcrum md:hidden block mb-6">
                <ul className="flex space-x-1 flex-wrap">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  {path_arr.map((path, idx) => {
                    const isLast = idx === path_arr.length - 1;
                    return (
                      <li className="capitalize" key={`bread-${idx}`}>
                        {isLast ? (
                          <span>{path.slug_name}</span>
                        ) : (
                          <Link href={path.slug}>{path.slug_name}</Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
                className="main-swiper mb-4"
              >
                {gallery.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full md:h-[400px] h-[300px] group">
                      <Image
                        src={item.image}
                        alt={item.alt_text || productName}
                        fill
                        className="object-cover object-center h-full w-full bg-[#ebedf0]"
                        placeholder="blur"
                        blurDataURL="/media/placeholder.jpg"
                      />
                      <button
                        onClick={() => openLightbox(index)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:scale-110 transition"
                      >
                        <i className="bi bi-zoom-in text-xl text-gray-800" />
                      </button>
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
                    <div className="relative w-full md:h-[100px] h-[80px] cursor-pointer">
                      <Image
                        src={item.image}
                        alt={item.alt_text || productName}
                        fill
                        className="object-cover object-center rounded h-full w-full bg-[#ebedf0]"
                        placeholder="blur"
                        blurDataURL="/media/placeholder.jpg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product Content */}
            <div className="product-content lg:w-3/5 w-full flex flex-col justify-between">
              <div className="context">
                <div className="breadcrum md:block hidden">
                  <ul className="flex space-x-1 flex-wrap">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    {
                       path_arr.map((path, idx) => {
                            const isLast = idx === path_arr.length - 1
                            return (
                                <li className="capitalize" key={`bread-${idx}`}>
                                    {isLast ? (
                                        <span>{path.slug_name}</span>  
                                    ) : (
                                        <Link href={path.slug}>{path.slug_name}</Link>
                                    )}
                                </li>
                            )
                        })
                    }
                  </ul>
                </div>
                <h1 className="font-semibold mt-2 capitalize">{productName}</h1>
                <p
                  className="mt-2 text-gray-700 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: productDescription }}
                ></p>
              </div>
              <button
                onClick={() => setIsPopupOpen(true)}
                className="enquire-btn sm:w-fit w-full sm:mt-4 mt-2 font-semibold px-4 py-2 bg-black text-white rounded"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={gallery.map((item) => ({
            src: item.image,
            alt: item.alt_text || productName,
            description: item.alt_text || productName,
          }))}
          plugins={[Captions]}
        />
      </section>
      <ContactPopupForm
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        productName={productName}
        setPopupMessage={setPopupMessage}
      />
    </>
  );
}
