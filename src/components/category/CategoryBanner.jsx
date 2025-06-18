import Image from "next/image";
import Breadcrum from "../Breadcrum";
import Link from "next/link";
export default function CategoryBanner({
  name,
  image,
  short_des,
  breadcrum,
  setIsPopupOpen,
}) {
  return (
    <>
      <section className="cat-banner">
        <div className="flex flex-wrap md:flex-row flex-col-reverse">
          <div className="category-info md:w-1/2 w-full">
            <Breadcrum path_arr={breadcrum} />
            <h1 className="capitalize">{name}</h1>
            <p>{short_des}</p>
            <div className="flex gap-x-5">
              <Link href="/all-products/">
                <button className="view-prod-btn">View All Products</button>
              </Link>
              <button
                onClick={() => setIsPopupOpen(true)}
                className="enquire-btn"
              >
                Enquire Now
              </button>
            </div>
          </div>
          <div className="category-image relative md:w-1/2 w-full">
            <Image
              className="z-10 h-full w-full bg-[#ebedf0]"
              placeholder="blur"
              blurDataURL="/media/placeholder.jpg"
              style={{ objectFit: "cover" }}
              fill
              alt={name}
              src={image}
            />
          </div>
        </div>
      </section>
    </>
  );
}
