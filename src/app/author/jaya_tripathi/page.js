// app/author/page.js

import MiniBanner from "@/components/MiniBanner";
import { getAllBlogs } from "@/lib/api/blogs";
import Link from "next/link";
import Image from "next/image";
import { getPageMetaData } from "@/lib/api/pagesMetaData";

export async function generateMetadata() {
    const pageMetaData = await getPageMetaData("blogs");

    return {
        title: "Jaya Tripathi, Author at Mpgstone",
        description: "Jaya Tripathi, Author and Content Writer at Mpgstone",
        keywords: pageMetaData.meta_keywords,
        openGraph: {
            title: "Jaya Tripathi, Author at Mpgstone",
            description: "Jaya Tripathi, Author and Content Writer at Mpgstone",
            url: "https://mpgstone.com/author/jaya_tripathi/",
            images: pageMetaData.meta_image,
            type: "website",
            locale: "en_US",
            siteName: "MPG Stone"
        },
        twitter: {
            title: "Jaya Tripathi, Author at Mpgstone",
            description: "Jaya Tripathi, Author and Content Writer at Mpgstone",
        },
        alternates: {
            canonical: "https://mpgstone.com/author/jaya_tripathi/"
        },
        robots: pageMetaData.robots_tag,
    };
}

export default async function BlogsDefaultPage() {
    const pageIndex = 1;
    const perPage = 9;

    const allBlogs = await getAllBlogs();

    const totalPages = Math.ceil(allBlogs.blogs.length / perPage);
    const start = (pageIndex - 1) * perPage;
    const end = start + perPage;
    const paginatedBlogs = allBlogs.blogs.slice(start, end);

    return (
        <>

            <section className="blog-page">
                <div className="wrapper">
                    <h1 className="md:text-2xl text-lg md:mb-8 mb-4 font-semibold">Jaya Tripathi&apos;s Blog Post</h1>
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
                                        <div className="p-4 flex flex-col justify-start h-[180px] text-center">
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
                            className={`px-6 py-4 font-semibold rounded hover:bg-[#DC5100] hover:text-white ${pageIndex === idx + 1
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
