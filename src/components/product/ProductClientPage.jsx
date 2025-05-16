"use client";

import { useState } from "react";
import ProductTop from "./ProductTop";

export default function ProductClientPage({ product }) {
//   const [activeTab, setActiveTab] = useState(categories[0]);
  console.log(product);
  const slugPath = [
    {
      slug_name: "Product Categories",
      slug: "/product-category",
    },
    {
      slug_name: product.category,
      slug: `/product-category/${product.category
        .toLowerCase()
        .replace(" ", "-")}`,
    },
    {
      slug_name: product.name,
      slug: `/product-category/${product.slug}`,
    },
  ];

  return (
    <>
      <ProductTop
        imgUrl={product.image}
        productName={product.name}
        productDescription={product.descriptions}
        path_arr={slugPath}
      />
      <section className="product-mid">
        <div className="wrapper">
          <div className="flex">

          </div>
        </div>
      </section>
    </>
  );
}
