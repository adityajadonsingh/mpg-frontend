"use client";

import Image from "next/image";
import Link from "next/link";
export default function ProductTop({
  imgUrl,
  productName,
  productDescription,
  path_arr
}) {
  return (
    <section className="product-top">
      <div className="wrapper">
        <div className="flex gap-x-10">
          <div className="img-box relative w-2/5 ">
            <Image
              alt={productName}
              fill
              src={imgUrl}
              className="object-cover"
            />
          </div>
          <div className="product-content w-3/5 flex flex-col justify-between">
            <div className="context">
              <div className="breadcrum">
                  <ul className="flex">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    {path_arr.map((path, idx) => (
                      <li key={`bread-${idx}`}>
                        <Link href={path.slug}>{path.slug_name}</Link>
                      </li>
                    ))}
                  </ul>
              </div>
              <h1>{productName}</h1>
              <p>{productDescription}</p>
            </div>
            <button className="enquire-btn w-fit">Enquire Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
