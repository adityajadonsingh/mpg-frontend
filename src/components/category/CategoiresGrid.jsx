"use client";

import { useState, useEffect } from "react";
import { useCategories } from "@/context/CategoryContext";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesGrid() {
  const categories = useCategories();
  console.log(categories);

  return (
    <section className="category-grid my-10 ">
      <div className="wrapper grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-x-6 gap-y-10">
        {categories.map((catObj, index) => {
          return (
            <Link href={`/product-category/${catObj.category_name.replace(/ /g, "-").toLowerCase()}`}>
              <div
                className="card group"
                key={`${catObj.category_name}-${index}`}
              >
                <div className="text pb-3 text-center">
                  <span className="md:text-lg sm:text-base text-sm group-hover:text-[#f36c23] capitalize text-center font-semibold">{catObj.category_name}</span>
                </div>
                <div className="relative rounded-md overflow-hidden xl:h-[340px] lg:h-[300px] md:h-[280px] sm:h-[200px] h-[150px] w-full">
                  <Image
                  src={catObj.image}
                  alt={catObj.category_name}
                  fill
                  className={"object-cover group-hover:scale-[1.05]"}
                />
                </div>
                
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
