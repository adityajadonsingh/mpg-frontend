"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePopup() {
  const [isVisible, setIsVisible] = useState(false);

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
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
      onClick={(e) => {
        if (e.target.id === "popup-overlay") {
          setIsVisible(false);
        }
      }}
    >
      <div
        className="relative w-[90%] max-w-[600px] aspect-square bg-cover bg-center rounded-xl flex flex-col items-center justify-center pt-16 text-center p-6 text-white"
        style={{
          backgroundImage: "url('/media/home-popup.webp')",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-4">
          Are you looking for Limestone, Porcelain, Quartz or Sandstone?{" "}
        </h2>
        <p className="text-lg mb-4">
          Fill out the form below and connect with our professionals today.
        </p>

        {/* CTA Buttons */}
          <Link href={"/contact-us/"}>
            <button className="bg-[#eb8a55] hover:bg-[#df621e] w-full mb-4 text-white px-4 py-2 cursor-pointer rounded-md">
            Get in touch here
          </button>
          </Link>
        <div className="md:grid grid-cols-2 gap-x-1 w-full hidden">
          <Link href={"/product-catalogue/"}><button className="bg-[#cb8e7b] hover:bg-[#6e5149] text-white px-4 py-2 cursor-pointer rounded-md">
            Explore Product Catalogues
          </button></Link>
          <Link href={"/product-category/"}><button className="bg-[#cb8e7b] hover:bg-[#6e5149] text-white px-4 py-2 cursor-pointer rounded-md">
            Explore Product Categories
          </button></Link>
        </div>
      </div>
    </div>
  );
}
