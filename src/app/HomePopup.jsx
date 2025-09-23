"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function useViewport() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile: width < 768, width };
}

export default function HomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useViewport();
  useEffect(() => {
    if (window.location.pathname === "/") {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="popup-overlay"
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999999999]"
      onClick={(e) => {
        if (e.target.id === "popup-overlay") {
          setIsVisible(false);
        }
      }}
    >
      <div className="relative bg-[#ffffffe5] backdrop-blur-[3px] xl:w-7/12 lg:w-10/12 w-11/12 md:max-h-[450px] max-h-full sm:h-fit h-8/12 aspect-square bg-cover bg-center rounded-lg flex flex-col items-center justify-center overflow-hidden ">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute z-20 top-3 right-3 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80"
        >
          ✕
        </button>
        <div className="flex md:flex-nowrap flex-wrap h-full w-full">
          <div className="relative md:w-5/12 w-full md:h-auto h-6/12">
            <Image
              src={ isMobile ? `/media/pop2.png` : `/media/pop1.png`}
              alt="popup"
              fill
              className="object-cover object-bottom"
            />
          </div>
          <div className="flex items-center md:w-7/12 w-full md:h-full h-6/12 md:py-10 py-4 md:px-8 px-4">
            <div className="content md:text-start text-center">
              <h2 className="md:text-2xl text-lg font-bold">
                Are you Looking For Limestone, Sandstone, Porcelain or Quartz ?
              </h2>
              <p className="mt-3 md:text-base text-sm text-[#505050]">
               Explore variety of products at MPG Stone today.
              </p>
              <Link className="block md:mt-6 mt-4 cursor-pointer" href={"/contact-us/"}>
                <button className="w-full md:py-3 py-2 md:text-base text-sm md:px-6 px-2 cursor-pointer text-white bg-black">
                  Get In Touch
                </button>
              </Link>
              {
                !isMobile && <div className="grid grid-cols-2 mt-4 gap-4">
                <Link
                  className="block cursor-pointer"
                  href={"/product-catalogue/"}
                >
                  <button className="w-full text-sm font- py-3 px-6 cursor-pointer text-black bg-white">
                    Explore Product Catalogue
                  </button>
                </Link>
                <Link
                  className="block cursor-pointer"
                  href={"/product-category/"}
                >
                  <button className="w-full text-sm font- py-3 px-6 cursor-pointer text-black bg-white">
                    Explore Product Categories
                  </button>
                </Link>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
