import Image from "next/image";
import Breadcrum from "../Breadcrum";

export default function CategoryBanner({ name, image, short_des, breadcrum }) {
  return (
    <>
      <section className="cat-banner">
        <div className="flex flex-wrap md:flex-row flex-col-reverse">
          <div className="category-info md:w-1/2 w-full">
          <Breadcrum path_arr={breadcrum} />
            <h1>{name}</h1>
            <p>{short_des}</p>
            <div className="flex gap-x-5">
              <a href="/all-products">
                <button className="view-prod-btn">View All Products</button>
              </a>
              <button className="enquire-btn">Enquire Now</button>
            </div>
          </div>
          <div className="category-image relative md:w-1/2 w-full">
            <Image style={{ objectFit: "cover" }} fill src={image} />
          </div>
        </div>
      </section>
    </>
  );
}
