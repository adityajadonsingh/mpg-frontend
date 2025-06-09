"use client";

import CategoryBanner from "@/components/category/CategoryBanner";
import Breadcrum from "@/components/Breadcrum";
import ProductGrid from "@/components/category/ProductGrid";
import Link from "next/link";
import { useState } from "react";
import ContactPopupForm from "@/components/ContactPopupForm";
import Popup from "@/components/Popup";


export default function AllProductsClientPage({
  categorySlug,
  paginatedProducts,
  allProducts,
  breadcrum,
  currentPage,
  totalPages,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

    console.log(allProducts, paginatedProducts)
  return (
    <>
    {popupMessage && (
            <Popup
              message={popupMessage}
              duration={3000}
              onClose={() => setPopupMessage("")}
            />
          )}
      <CategoryBanner
        name={"All Products"}
        image={"https://img.freepik.com/free-photo/colorful-vertical-slabs-marble_53876-74705.jpg"}
        short_des={""}
        breadcrum={breadcrum}
        setIsPopupOpen={setIsPopupOpen}
      />
      <div className="cat-page">
        <Breadcrum path_arr={breadcrum} />
      </div>

      {/* Search and Product Grid */}
      <ProductGrid
        categorySlug={categorySlug}
        paginatedProducts={paginatedProducts}
        allProducts={allProducts}
      />

      {/* Pagination - hide when searching (handled in ProductGrid) */}
      {totalPages > 1 && (
        <div className="pagination text-center my-6 space-x-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <Link
              key={idx}
              href={
                idx === 0
                  ? `/all-products/`
                  : `/all-products/page/${idx + 1}`
              }
              className={`px-6 py-4 font-semibold rounded hover:bg-[#DC5100] hover:text-white ${
                currentPage === idx + 1
                  ? "bg-[#DC5100] text-white"
                  : "bg-[#E9E9ED] text-[#8a8a8c]"
              }`}
            >
              {idx + 1}
            </Link>
          ))}
        </div>
      )}
      <ContactPopupForm
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        productName={"All Products Page"}
        setPopupMessage={setPopupMessage}
      />
    </>
  );
}
