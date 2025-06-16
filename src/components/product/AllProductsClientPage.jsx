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
  const [searchTerm, setSearchTerm] = useState("");

  const showPagination = totalPages > 1 && searchTerm === "";

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
        image={
          "https://img.freepik.com/free-photo/colorful-vertical-slabs-marble_53876-74705.jpg"
        }
        short_des={""}
        breadcrum={breadcrum}
        setIsPopupOpen={setIsPopupOpen}
      />

      <div className="cat-page">
        <Breadcrum path_arr={breadcrum} />
      </div>

      <ProductGrid
        categorySlug={categorySlug}
        paginatedProducts={paginatedProducts}
        allProducts={allProducts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {showPagination && (
        <div className="pagination text-center my-6 space-x-2">
          {currentPage > 1 && (
            <Link
              href={`/all-products/page/${currentPage - 1}`}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              « Previous
            </Link>
          )}

          {[
            1,
            2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            totalPages - 1,
            totalPages,
          ]
            .filter(
              (value, index, self) =>
                value > 0 &&
                value <= totalPages &&
                self.indexOf(value) === index
            )
            .sort((a, b) => a - b)
            .map((page, idx, arr) => (
              <span key={page + "-wrap"}>
                {idx > 0 && page - arr[idx - 1] > 1 && (
                  <span className="px-2 py-2">...</span>
                )}
                <Link
                  key={page}
                  href={
                    page === 1 ? `/all-products/` : `/all-products/page/${page}`
                  }
                  className={`px-4 py-2 rounded font-semibold ${
                    currentPage === page
                      ? "bg-[#DC5100] text-white"
                      : "bg-[#E9E9ED] text-[#8a8a8c]"
                  }`}
                >
                  {page}
                </Link>
              </span>
            ))}

          {currentPage < totalPages && (
            <Link
              href={`/all-products/page/${currentPage + 1}`}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Next »
            </Link>
          )}
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
