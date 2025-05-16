"use client";

import { useCategories } from "@/context/CategoryContext";

export default function CategoriesGrid() {
  const categories = useCategories();
  return (
    <>
      <section className="category-grid">
        <div className="wrapper">
          <div className="grid grid-cols-12 gap-4">
            {/* Row 1 */}
            <div className="col-span-6 first-cols rounded overflow-hidden group">
              <a className="block relative w-full h-full" href={`/product-category/${categories[5].slug}`}>
                <img
                  src={categories[5].image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Overlay title={categories[5].category_name} short_des={categories[5].short_description} />
              </a>
            </div>

            <div className="col-span-6 first-cols relative rounded overflow-hidden group">
              <a className="block relative w-full h-full" href={`/product-category/${categories[3].slug}`}>
                <img
                  src={categories[3].image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Overlay title={categories[3].category_name} short_des={categories[3].short_description} />
              </a>
            </div>

            {/* Row 2 */}
            <div className="col-span-3 second-cols relative rounded overflow-hidden group">
              <a className="block relative w-full h-full" href={`/product-category/${categories[4].slug}`}>
                <img
                  src={categories[4].image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Overlay title={categories[4].category_name} short_des={categories[4].short_description} />
              </a>
            </div>

            <div className="col-span-3 second-cols relative rounded overflow-hidden group">
              <a className="block relative w-full h-full" href={`/product-category/${categories[6].slug}`}>
                <img
                  src={categories[6].image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Overlay title={categories[6].category_name} short_des={categories[6].short_description} />
              </a>
            </div>

            <div className="col-span-3 second-cols relative rounded overflow-hidden group">
              <a className="block relative w-full h-full" href={`/product-category/${categories[1].slug}`}>
                <img
                  src={categories[1].image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Overlay title={categories[1].category_name} short_des={categories[1].short_description} />
              </a>
            </div>

            <div className="col-span-3 second-cols relative rounded overflow-hidden group">
              <a className="block relative w-full h-full" href={`/product-category/${categories[7].slug}`}>
                <img
                  src={categories[7].image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Overlay title={categories[7].category_name} short_des={categories[7].short_description} />
              </a>
            </div>

            {/* Row 3 */}
            <div className="col-span-8 third-cols relative rounded overflow-hidden group">
              <a className="block relative w-full h-full" href={`/product-category/${categories[2].slug}`}>
                <img
                  src={categories[2].image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Overlay title={categories[2].category_name} short_des={categories[2].short_description} />
              </a>
            </div>

            <div className="col-span-4 third-cols relative rounded overflow-hidden group">
              <a className="block relative w-full h-full" href={`/product-category/${categories[0].slug}`}>
                <img
                  src={categories[0].image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Overlay title={categories[0].category_name} short_des={categories[0].short_description} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function Overlay({ title, short_des }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4 overlay-txt">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="font-semibold">
        {short_des}
      </p>
    </div>
  );
}
