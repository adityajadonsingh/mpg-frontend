"use client";

import { useState } from "react";
import ProductAttributes from "@/components/product/ProductAttributes";
import ProductReviews from "@/components/product/ProductReviews";

export default function ProductMid({ accordionData, product_id }) {
  const [activeTab, setActiveTab] = useState("details");
  return (
    <>
      <section className="product-mid">
        <div className="wrapper">
          <div className="flex justify-center gap-x-10">
            <button
              className={`toggle-btn ${
                activeTab === "details" ? "active" : ""
              }`}
              onClick={() => setActiveTab("details")}
            >
              Details
            </button>
            <button
              className={`toggle-btn ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className="toggle-item mt-8">
            <div className="wrap md:p-10 p-6">
              {activeTab === "details" && (
                <ProductAttributes accordionData={accordionData} />
              )}
              {activeTab === "reviews" && (
                <ProductReviews product_id={product_id} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
