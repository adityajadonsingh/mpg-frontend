"use client";

import Link from "next/link";

export default function Pagination({ categorySlug, total, currentPage, perPage }) {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination flex justify-center mb-10 gap-2">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const isActive = currentPage === page;
        const href =
          page === 1
            ? `/product-category/${categorySlug}`
            : `/product-category/${categorySlug}/page/${page}`;

        return (
          <Link key={i} href={href}>
            <span
              className={`px-6 py-4 font-semibold rounded hover:bg-[#DC5100] hover:text-white ${
                isActive
                  ? "bg-[#DC5100] text-white"
                  : "bg-[#E9E9ED] text-[#8a8a8c]"
              }`}
            >
              {page}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
