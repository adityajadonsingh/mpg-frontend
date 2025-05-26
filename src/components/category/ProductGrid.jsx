// components/category/ProductGrid.jsx

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductGrid({ categorySlug, paginatedProducts, allProducts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(paginatedProducts);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(paginatedProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, allProducts, paginatedProducts]);

  return (
    <section className="product-grid">
      <div className="wrapper">
        <div className="search-product-box flex w-full justify-end">
          <div className="wrap sm:w-2/5 w-full">
            <div className="relative">
              <input
                className="w-full my-8 border border-gray-300 rounded pl-3 pr-8 py-2 bg-gray-100"
                type="text"
                placeholder="Search Product"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="bi bi-search absolute top-[50%] right-2 translate-y-[-50%] text-[#828285]"></i>
            </div>
          </div>
        </div>

        {filteredProducts.length !== 0 ? (
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 products-grid gap-5 mb-10">
            {filteredProducts.map((product, idx) => (
              <div className="card w-full relative z-0" key={`product-${idx}`}>
                <a
                  className="block w-full h-full"
                  href={`/product-category/${categorySlug}/${product.slug}/`}
                >
                  <div className="card-wrap w-full h-full relative">
                    <div className="read-more">
                      <i className="bi bi-bag mr-2"></i>
                      <span>Know More</span>
                    </div>
                    <Image
                      alt={product.name}
                      src={product.image}
                      fill
                      style={{ objectFit: "cover" }}
                      className="z-10 h-full w-full bg-[#ebedf0]"
                      placeholder="blur"
                      blurDataURL="/media/placeholder.jpg"
                    />
                    <span className="z-20 absolute prod-name">
                      {product.name}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <span className="block text-center font-bold text-2xl text-[#727174]">
            Not Found
          </span>
        )}
      </div>
    </section>
  );
}
