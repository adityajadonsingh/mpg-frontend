// app/blogs/page.js

import Breadcrum from "@/components/Breadcrum";
import MiniBanner from "@/components/MiniBanner";
import { getAllBlogs } from "@/lib/api/blogs";
import Link from "next/link";
import Image from "next/image";

export default async function BlogsDefaultPage() {
    const pageIndex = 1;
    const perPage = 9;

    const allBlogs = await getAllBlogs();
    console.log(allBlogs.blogs)

    const totalPages = Math.ceil(allBlogs.blogs.length / perPage);
    const start = (pageIndex - 1) * perPage;
    const end = start + perPage;
    const paginatedBlogs = allBlogs.blogs.slice(start, end);
    const slugPath = [
        { slug_name: "Blogs", slug: "/blogs/" },
    ];

    return (
        <>
            <MiniBanner bg_img={"https://img.freepik.com/premium-photo/background-texture-natural-stone-marble-granite-mosaic_166216-235.jpg"} pageName={"All Blogs"} />
            <Breadcrum path_arr={slugPath} />
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
                                            />
                                        </div>
                                        <div className="p-4 flex flex-col justify-between h-[150px] text-center">
                                            <h3 className="lg:text-lg text-md font-semibold mb-2">{blog.title}</h3>
                                            <p className="text-orange-600 text-sm mb-2">
                                                Jaya Tripathi |{" "}
                                                <span className="text-gray-600">{blog.date_posted}</span>
                                            </p>
                                            <p className="text-sm text-gray-600 line-clamp-3">
                                                {blog.description}
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
