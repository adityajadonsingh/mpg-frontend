"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductGrid({ categorySlug, products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    // Filter products based on the search term (case-insensitive)
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);
  console.log(filteredProducts);
  return (
    <section className="product-grid">
      <div className="wrapper">
        <div className="search-product-box flex w-full justify-end">
          <div className="wrap w-2/5">
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
          <div className="grid grid-cols-4 products-grid gap-5 mb-10">
            {filteredProducts.map((product, idx) => (
              <div className="card w-full relative z-0" key={`product-${idx}`}>
                
                <a
                  className="block w-full h-full"
                  href={`/product-category/${categorySlug}/${product.slug}`}
                >
                  <div className="card-wrap w-full h-full relative">
                    <div className="read-more">
                  <i className="bi bi-bag mr-2"></i>
                  <span>Know More</span>
                </div>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="z-10 h-full w-full"
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
