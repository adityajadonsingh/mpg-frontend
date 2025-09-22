// app/blogs/page.js

import MiniBanner from "@/components/MiniBanner";
import { getAllBlogs } from "@/lib/api/blogs";
import Link from "next/link";
import Image from "next/image";
import { getPageMetaData } from "@/lib/api/pagesMetaData";

export async function generateMetadata() {
  const pageMetaData = await getPageMetaData("blogs");

  return {
    title: pageMetaData.meta_title,
    description: pageMetaData.meta_description,
    keywords: pageMetaData.meta_keywords,
    openGraph: {
      title: pageMetaData.og_title || pageMetaData.meta_title,
      description:
        pageMetaData.og_descriptions || pageMetaData.meta_description,
      url: pageMetaData.canonical_url,
      images: pageMetaData.meta_image,
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: pageMetaData.twitter_title || pageMetaData.meta_title,
      description:
        pageMetaData.twitter_description || pageMetaData.meta_description,
      images: pageMetaData.meta_image,
    },
    alternates: {
      canonical: pageMetaData.canonical_url || "",
    },
    robots: pageMetaData.robots_tag,
  };
}

export default async function BlogsDefaultPage() {
  const pageIndex = 1;
  const perPage = 9;

  const allBlogs = await getAllBlogs();

  if (!allBlogs || !allBlogs.blogs.length) return notFound();

  // Sort blogs by date
  const sortedBlogs = [...allBlogs.blogs].sort(
    (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
  );

  const totalPages = Math.ceil(sortedBlogs.length / perPage);
  if (pageIndex > totalPages || pageIndex < 1) return notFound();

  const start = (pageIndex - 1) * perPage;
  const end = start + perPage;
  const paginatedBlogs = sortedBlogs.slice(start, end);

  return (
    <>
      <MiniBanner bg_img={"/media/blogs_banner.webp"} pageName={"Blogs"} />
      <section className="blog-page">
        <div className="wrapper">
          <div className="grid lg:grid-cols-3 gap-5">
            {paginatedBlogs.map((blog, idx) => {
              return (
                <Link
                  key={`blog-${idx}`}
                  href={`/blogs/${blog.slug}`}
                  className="block"
                >
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
                      <h3 className="lg:text-lg text-md font-semibold mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-orange-600 text-sm mb-2">
                        Jaya Tripathi |{" "}
                        <span className="text-gray-600">
                          {new Date(blog.date_posted).toLocaleDateString(
                            "en-GB",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
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
              );
            })}
          </div>
        </div>
      </section>
      {totalPages > 1 && (
        <div className="pagination text-center my-6 space-x-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <Link
              key={idx}
              href={idx === 0 ? `/blogs` : `/blogs/page/${idx + 1}`}
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
