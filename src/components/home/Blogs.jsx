"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Link from "next/link";
import Image from "next/image";

const blogs = [
  {
    title: "Quartz or Marble which is better for your space",
    image:
      "https://img.freepik.com/free-vector/elegant-hand-painted-alcohol-ink-background-with-gold-glitter_1048-16896.jpg?t=st=1746512294~exp=1746515894~hmac=8ee0123d78cbd640e599812958ff633536954410f5aeac946b90a7162f573af0&w=1060",
    date: "January 30, 2024",
    source: "mpgstone.co.uk",
    slug: "quartz-vs-marble",
  },
  {
    title: "Designing the Perfect Kitchen Counter",
    image:
      "https://img.freepik.com/free-vector/elegant-hand-painted-alcohol-ink-background-with-gold-glitter_1048-16896.jpg?t=st=1746512294~exp=1746515894~hmac=8ee0123d78cbd640e599812958ff633536954410f5aeac946b90a7162f573af0&w=1060",
    date: "February 12, 2024",
    source: "mpgstone.co.uk",
    slug: "perfect-kitchen-counter",
  },
  {
    title: "Top 5 Stones for Outdoor Patios",
    image:
      "https://img.freepik.com/free-vector/elegant-hand-painted-alcohol-ink-background-with-gold-glitter_1048-16896.jpg?t=st=1746512294~exp=1746515894~hmac=8ee0123d78cbd640e599812958ff633536954410f5aeac946b90a7162f573af0&w=1060",
    date: "March 5, 2024",
    source: "mpgstone.co.uk",
    slug: "top-5-stones-outdoor-patios",
  },
  {
    title: "How to Maintain Your Granite Surfaces",
    image:
      "https://img.freepik.com/free-vector/elegant-hand-painted-alcohol-ink-background-with-gold-glitter_1048-16896.jpg?t=st=1746512294~exp=1746515894~hmac=8ee0123d78cbd640e599812958ff633536954410f5aeac946b90a7162f573af0&w=1060",
    date: "March 18, 2024",
    source: "mpgstone.co.uk",
    slug: "maintain-granite-surfaces",
  },
  {
    title: "The Benefits of Engineered Quartz",
    image:
      "https://img.freepik.com/free-vector/elegant-hand-painted-alcohol-ink-background-with-gold-glitter_1048-16896.jpg?t=st=1746512294~exp=1746515894~hmac=8ee0123d78cbd640e599812958ff633536954410f5aeac946b90a7162f573af0&w=1060",
    date: "April 4, 2024",
    source: "mpgstone.co.uk",
    slug: "benefits-of-engineered-quartz",
  },
  {
    title: "Natural Stone Trends for 2024",
    image:
      "https://img.freepik.com/free-vector/elegant-hand-painted-alcohol-ink-background-with-gold-glitter_1048-16896.jpg?t=st=1746512294~exp=1746515894~hmac=8ee0123d78cbd640e599812958ff633536954410f5aeac946b90a7162f573af0&w=1060",
    date: "April 22, 2024",
    source: "mpgstone.co.uk",
    slug: "stone-trends-2024",
  },
  {
    title: "Choosing the Right Countertop for Your Bathroom",
    image:
      "https://img.freepik.com/free-vector/elegant-hand-painted-alcohol-ink-background-with-gold-glitter_1048-16896.jpg?t=st=1746512294~exp=1746515894~hmac=8ee0123d78cbd640e599812958ff633536954410f5aeac946b90a7162f573af0&w=1060",
    date: "May 1, 2024",
    source: "mpgstone.co.uk",
    slug: "bathroom-countertop-guide",
  },
  {
    title: "MPGStone’s Project Highlights: Stunning Transformations",
    image:
      "https://img.freepik.com/free-vector/elegant-hand-painted-alcohol-ink-background-with-gold-glitter_1048-16896.jpg?t=st=1746512294~exp=1746515894~hmac=8ee0123d78cbd640e599812958ff633536954410f5aeac946b90a7162f573af0&w=1060",
    date: "May 6, 2024",
    source: "mpgstone.co.uk",
    slug: "mpgstone-project-highlights",
  },
];

export default function Blogs() {
  return (
    <section className="home-blog">
      <div className="wrapper">
        <h2 className="heading mb-6">Latest Blogs</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation
          spaceBetween={20}
          slidesPerView={3}
          className="blog-swiper"
        >
          {blogs.map((blog, idx) => (
            <SwiperSlide key={idx}>
              <Link href={`/blog/${blog.slug}`} className="block">
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-full">
                  <div className="img-box relative">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between h-[150px] text-center">
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <p className="text-orange-600 text-sm mb-2">
                      {blog.source} |{" "}
                      <span className="text-gray-600">{blog.date}</span>
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      Designing and renovating your indoor space can be an
                      exciting thing to do. But it comes with some challenging
                      tasks to choose
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
