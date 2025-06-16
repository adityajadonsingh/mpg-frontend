// app/blogs/[slug]/page.js

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogs } from "@/lib/api/blogs";
import Breadcrum from "@/components/Breadcrum";
import CopyUrlButton from "@/components/blog/CopyUrlButton";
import FacebookShareButton from "@/components/blog/FacebookShareButton";
import XShareButton from "@/components/blog/XShareButton";
import LinkedInShareButton from "@/components/blog/LinkedInShareButton";
import CommentSection from "@/components/blog/CommentSection";

export async function generateStaticParams() {
    const allBlogs = await getAllBlogs();
    return allBlogs.blogs.map((blog) => ({
        slug: blog.slug,
    }));
}


export default async function BlogSinglePage({ params }) {
    const allBlogs = await getAllBlogs();
    const pageSlug = await params.slug;
    const blog = allBlogs.blogs.find((b) => b.slug === pageSlug);
    const latestBlogs = allBlogs.blogs.filter(b => b.slug !== blog.slug).slice(0, 3);
    const prevPost = allBlogs.blogs.filter(b => b.id === blog.id - 1);
    const nextPost = allBlogs.blogs.filter(b => b.id === blog.id + 1);
    if (!blog) return notFound();
    console.log(blog)
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
                        Posted on {blog.date_posted} | Author: {blog.author || "Jaya Tripathi"}
                    </p>
                    <div className="relative w-full h-[400px] mb-6">
                        <Image src={blog.image} alt={blog.title} fill className="object-cover rounded" />
                    </div>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>
                    <div className="blog-btm flex justify-between items-center mt-8">
                        <div className="flex gap-x-4">
                            {
                                prevPost.length !== 0 ? <Link href={`/blogs/${prevPost[0].slug}`}><button className="post-nav">Previous Post</button></Link> : null
                            }
                            {
                                nextPost.length !== 0 ? <Link href={`/blogs/${nextPost[0].slug}`}><button className="post-nav">Next Post</button></Link> : null
                            }
                        </div>
                        <div className="share">
                            <ul className="flex gap-x-3">
                                <li><CopyUrlButton /></li>
                                <li><FacebookShareButton /></li>
                                <li><XShareButton text="Read this awesome blog:" /></li>
                                <li><LinkedInShareButton /></li>
                            </ul>
                        </div>
                    </div>
                    <CommentSection blogId={blog.id} blogTitle={blog.title}/>


                </div>
                <div className="latest-blogs">
                    <h2 className="text-center">Latest Blogs</h2>
                    <ul className="latest-list grid grid-cols-1 gap-5 mt-4">
                        {latestBlogs.map((item, idx) => (
                            <Link key={idx} href={`/blogs/${item.slug}`} className="block">
                                <div className="bg-gray-100 p-4 flex rounded shadow hover:shadow-lg transition-all">
                                    <div className="relative img-box">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="text-side">
                                        <h3 className="font-semibold text-md">{item.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </ul>
                </div>
            </section>

        </>
    );
}
