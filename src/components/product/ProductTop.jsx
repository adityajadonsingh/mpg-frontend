"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [safeDescription, setSafeDescription] = useState("");
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    setSafeDescription(productDescription);
  }, [productDescription]);
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
          <div className="flex xl:w-11/12 w-full mx-auto gap-x-10 lg:flex-nowrap flex-wrap gap-y-10 justify-center">
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
                    <div className="relative w-full md:h-[490px] h-[340px] group">
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
            <div className="product-content lg:w-3/5 w-full flex flex-col ">
              <div className="context">
                <div className="breadcrum md:block hidden">
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
                <h1 className="font-semibold mt-2 capitalize">{productName}</h1>
                <p
                  className="mt-2 text-gray-700 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: safeDescription }}
                ></p>
              </div>
              <div className="block">
                <div className="features-cards">
                  <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-4 grid-cols-2 gap-3">
                    <div className="card flex justify-center items-center sm:gap-x-5 gap-x-2 bg-[#f9f9f9] md:py-3 py-2 md:px-3 px-2 rounded-md">
                      <div className="img-box w-[60px] h-[60px] relative">
                        <Image
                          fill
                          className="w-full h-full object-contain object-cente"
                          src="/media/icons/delivery-truck.png"
                          
                          alt="truck"
                        />
                      </div>
                      <div className="text">
                        <h4 className="sm:text-base text-sm font-medium">
                          Delivery all over UK
                        </h4>
                      </div>
                    </div>

                    <div className="card flex justify-center items-center sm:gap-x-5 gap-x-2 bg-[#f9f9f9] md:py-3 py-2 md:px-3 px-2 rounded-md">
                      <div className="img-box w-[60px] h-[60px] relative">
                        <Image
                          fill
                          className="w-full h-full object-contain object-cente"
                          src="/media/icons/satisfaction.png"
                          
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <h4 className="sm:text-base text-sm font-medium">
                          Customer Satisfaction
                        </h4>
                      </div>
                    </div>

                    <div className="card flex justify-center items-center sm:gap-x-5 gap-x-2 bg-[#f9f9f9] md:py-3 py-2 md:px-3 px-2 rounded-md">
                      <div className="img-box w-[60px] h-[60px] relative">
                        <Image
                          fill
                          className="w-full h-full object-contain object-cente"
                          src="/media/icons/premium.png"
                          
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <h4 className="sm:text-base text-sm font-medium">
                          Premium Quality
                        </h4>
                      </div>
                    </div>

                    <div className="card flex justify-center items-center sm:gap-x-5 gap-x-2 bg-[#f9f9f9] md:py-3 py-2 md:px-3 px-2 rounded-md">
                      <div className="img-box w-[60px] h-[60px] relative">
                        <Image
                          fill
                          className="w-full h-full object-contain object-cente"
                          src="/media/icons/price-comparison.png"
                          
                          alt=""
                        />
                      </div>
                      <div className="text">
                        <h4 className="sm:text-base text-sm font-medium">
                          Price Match Guarantee
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="connect flex sm:flex-nowrap flex-wrap items-center rounded-md gap-x-2 gap-y-2 mt-5 px-5 py-6 bg-[#f9f9f9]">
                  <div className="xl:w-7/12 lg:w-6/12 w-full sm:w-5/12 sm:text-start text-center">
                    <span className="text-lg font-medium ">
                      Would you like to connect?
                    </span>
                  </div>
                  <div className="xl:w-5/12 lg:w-6/12 sm:w-7/12 w-full flex gap-x-3">
                    <button
                      onClick={() => setIsPopupOpen(true)}
                      className=" w-full font-semibold px-4 py-2 bg-[#f36c23] hover:bg-[#f36c23d2] cursor-pointer text-white rounded"
                    >
                      Contact Us
                    </button>
                    <Link
                      href={"mailto:info@mpgstone.com"}
                      className="block w-full"
                    >
                      <button className=" w-full font-semibold px-4 py-2 bg-[#5a5c5d] text-white rounded cursor-pointer">
                        Mail Us
                      </button>
                    </Link>
                  </div>
                </div>
                <span className="font-semibold text-sm mt-5 block">
                  *Please note: The Slab size, thickness, finish could be
                  slightly varied from the images.
                </span>
              </div>
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
