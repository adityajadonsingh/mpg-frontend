"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Link from "next/link";
import Image from "next/image";

export default function Blogs({ blogs }) {
  const sortedBlogs = blogs
    .slice()
    .sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));

  return (
    <section className="home-blog">
      <div className="wrapper">
        <h2 className="heading mb-6">Latest Blogs</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          className="blog-swiper"
          breakpoints={{
            500: {
              slidesPerView: 2,
            },
            991: {
              slidesPerView: 3,
            },
          }}
        >
          {sortedBlogs.slice(0, 5).map((blog, idx) => (
            <SwiperSlide key={idx}>
              <Link href={`/blogs/${blog.slug}`} className="block">
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-full">
                  <div className="img-box relative">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      style={{ objectFit: "cover" }}
                      placeholder="blur"
                      blurDataURL="/media/placeholder.jpg"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-start h-[180px] text-center">
                    <h3 className="lg:text-lg text-md font-semibold mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-orange-600 text-sm mb-2">
                      Jaya Tripathi |{" "}
                      <span className="text-gray-600">
                        {new Date(blog.date_posted).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {blog.description.length > 100
                        ? `${blog.description.slice(0, 100)} ...`
                        : blog.description}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
