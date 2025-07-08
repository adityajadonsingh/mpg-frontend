"use client";

import CategoryBanner from "@/components/category/CategoryBanner";
import Breadcrum from "@/components/Breadcrum";
import ProductGrid from "@/components/category/ProductGrid";
import Link from "next/link";
import { useEffect, useState } from "react";
import ContactPopupForm from "@/components/ContactPopupForm";
import Popup from "@/components/Popup";
import MiniBanner from "../MiniBanner";

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
  const [isMobile, setIsMobile] = useState(false);

  const showPagination = totalPages > 1 && searchTerm === "";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {popupMessage && (
        <Popup
          message={popupMessage}
          duration={3000}
          onClose={() => setPopupMessage("")}
        />
      )}
      <MiniBanner
        bg_img={
          "https://html.kodesolution.com/2024/tilepro-html/images/background/page-title-bg.png"
        }
        pageName={"Products"}
      />
      {/* <CategoryBanner
        name={"All Products"}
        image={
          "https://img.freepik.com/free-photo/colorful-vertical-slabs-marble_53876-74705.jpg"
        }
        short_des={""}
        breadcrum={breadcrum}
        setIsPopupOpen={setIsPopupOpen}
      /> */}

      {/* <div className="cat-page">
        <Breadcrum path_arr={breadcrum} />
      </div> */}

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
              href={`/products/page/${currentPage - 1}`}
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
                  href={page === 1 ? `/products/` : `/products/page/${page}`}
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
              href={`/products/page/${currentPage + 1}`}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              <span className="sm:inline hidden">Next</span> »
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
