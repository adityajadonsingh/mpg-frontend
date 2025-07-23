// app/blogs/[...slug]/page.js

import MiniBanner from "@/components/MiniBanner";
import { getAllBlogs } from "@/lib/api/blogs";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogPaginatedPage({ params }) {
  const slug = await params.slug;

  // Validate: expecting /blogs/page/2
  if (slug.length !== 2 || slug[0] !== "page") return notFound();

  const rawPage = slug[1];
  if (!/^\d+$/.test(rawPage) || rawPage.startsWith("0")) return notFound();

  const pageIndex = parseInt(rawPage);
  const perPage = 9;
  const allBlogs = await getAllBlogs();

  if (!allBlogs || !allBlogs.blogs.length) return notFound();

  const totalPages = Math.ceil(allBlogs.blogs.length / perPage);
  if (pageIndex > totalPages || pageIndex < 1) return notFound();

  const start = (pageIndex - 1) * perPage;
  const end = start + perPage;
  const paginatedBlogs = allBlogs.blogs.slice(start, end);

 

  return (
    <>
      <MiniBanner bg_img={"/media/blogs_banner.webp"} pageName={`Blogs`} />

      <section className="blog-page">
        <div className="wrapper">
          <div className="grid lg:grid-cols-3 gap-5">
                        {
                            paginatedBlogs.map((blog, idx) => {
                                return <Link key={`blog-${idx}`} href={`/blogs/${blog.slug}`} className="block">
                                    <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-full">
                                        <div className="img-box relative">
                                            <Image
                                                src={blog.image}
                                                alt={blog.title}
                                                fill
                                                style={{ objectFit: "cover" }}
                                                className="z-10 h-full w-full bg-[#ebedf0]"
                                                placeholder="blur"
                                                blurDataURL="/media/placeholder.jpg"
                                            />
                                        </div>
                                        <div className="p-4 flex flex-col text-center">
                                            <h3 className="lg:text-lg text-md font-semibold mb-2">{blog.title}</h3>
                                            <p className="text-orange-600 text-sm mb-2">
                                                Jaya Tripathi |{" "}
                                                <span className="text-gray-600">{new Date(blog.date_posted).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}</span>
                                            </p>
                                            <p className="text-sm text-gray-600 line-clamp-3">
                                                {blog.description.length > 100
                                                    ? `${blog.description.slice(0, 100)} ...`
                                                    : blog.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            })
                        }
                    </div>
        </div>
      </section>

      {totalPages > 1 && (
        <div className="pagination text-center my-6 space-x-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <Link
              key={idx}
              href={
                idx === 0
                  ? `/blogs`
                  : `/blogs/page/${idx + 1}`
              }
              className={`px-6 py-4 font-semibold rounded hover:bg-[#DC5100] hover:text-white ${
                pageIndex === idx + 1
                  ? "bg-[#DC5100] text-white"
                  : "bg-[#E9E9ED] text-[#8a8a8c]"
              }`}
            >
              {idx + 1}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
