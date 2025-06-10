// app/blogs/[slug]/page.js

import { getAllBlogs, getBlogBySlug } from "@/lib/api/blogs";
import Breadcrum from "@/components/Breadcrum";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const allBlogs = await getAllBlogs();
    return allBlogs.blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default async function BlogSinglePage({ params }) {
    const allBlogs = await getAllBlogs();
    const blog = allBlogs.blogs.find((b) => b.slug === params.slug);
    const latestBlogs = allBlogs.blogs.filter(b => b.slug !== blog.slug).slice(0, 3);
    if (!blog) return notFound();

    const slugPath = [
        { slug_name: "Blogs", slug: "/blogs" },
        { slug_name: blog.title, slug: `/blogs/${blog.slug}` },
    ];

    return (
        <>


            <section className="single-blog wrapper my-8">
                <div className="blog-content">
                    <div className="single-blog-breadcrum mb-4">
                        <Breadcrum path_arr={slugPath} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                    <p className="text-sm text-gray-600 mb-6">
                        Posted on {blog.date_posted} | Author: {blog.author || "Admin"}
                    </p>
                    <div className="relative w-full h-[400px] mb-6">
                        <Image src={blog.image} alt={blog.title} fill className="object-cover rounded" />
                    </div>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>
                </div>
                <div className="latest-blogs">
                    <h2 className="text-center">Latest Blogs</h2>
                    <ul className="latest-list grid grid-cols-1 gap-5 mt-4">
                        {latestBlogs.map((item, idx) => (
                            <Link key={idx} href={`/blogs/${item.slug}`} className="block">
                                <div className="bg-gray-100 p-4 rounded shadow hover:shadow-lg transition-all">
                                    <div className="relative h-40 mb-3">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>

            </section>
        </>
    );
}
