"use client";

import { useCategories } from "@/context/CategoryContext";
import CategoryBanner from "@/components/category/CategoryBanner";
import Breadcrum from "@/components/Breadcrum";
import ProductGrid from "./ProductGrid";
import Link from "next/link";
import { useEffect, useState } from "react";
import ContactPopupForm from "@/components/ContactPopupForm";
import Popup from "@/components/Popup";
import PageDescription from "@/components/PageDescription";

export default function CategoryClientPage({
  categorySlug,
  paginatedProducts,
  allProducts,
  breadcrum,
  currentPage,
  totalPages,
  isPaginatedPage
}) {
  const categories = useCategories();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const categoryDetails = categories.find(
    (cat) => cat.slug.toLowerCase() === categorySlug.toLowerCase()
  );

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
        name={categoryDetails.category_name}
        image={categoryDetails.image}
        short_des={categoryDetails.short_description}
        breadcrum={breadcrum}
        setIsPopupOpen={setIsPopupOpen}
        isPaginatedPage={isPaginatedPage}
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
              href={`/product-category/${categorySlug}/page/${currentPage - 1}`}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              « <span className="sm:inline hidden">Previous</span>
            </Link>
          )}

          {(isMobile
            ? [currentPage - 1, currentPage, currentPage + 1]
            : [
                1,
                2,
                currentPage - 1,
                currentPage,
                currentPage + 1,
                totalPages - 1,
                totalPages,
              ]
          )
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
                    page === 1
                      ? `/product-category/${categorySlug}`
                      : `/product-category/${categorySlug}/page/${page}`
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
              href={`/product-category/${categorySlug}/page/${currentPage + 1}`}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              <span className="sm:inline hidden">Next</span> »
            </Link>
          )}
        </div>
      )}

      {currentPage === 1 && (
        <PageDescription content={categoryDetails.descriptions} />
      )}

      <ContactPopupForm
        isOpen={isPopupOpen}
        setIsOpen={setIsPopupOpen}
        productName={categoryDetails.category_name}
        setPopupMessage={setPopupMessage}
      />
    </>
  );
}
