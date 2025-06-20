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
            <section className="single-blog lg:w-full md:w-11/12 w-full mx-auto wrapper md:my-8 my-5 gap-y-6 lg:flex-nowrap flex-wrap">
                <div className="blog-content xl:w-9/12 lg:w-8/12 w-full lg:pl-10 lg:pr-20">
                    <div className="single-blog-breadcrum xl:mb-4 mb-2">
                        <Breadcrum path_arr={slugPath} />
                    </div>
                    <h1 className="xl:text-4xl lg:text-3xl text-2xl font-bold xl:mb-4 mb-3">{blog.title}</h1>
                    <p className="md:text-sm text-xs  text-gray-600 mb-6">
                        Posted on {new Date(blog.date_posted).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })} | Author: {blog.author || "Jaya Tripathi"}
                    </p>
                    <div className="relative w-full md:h-[400px] sm:h-[350px] h-[250px] mb-6">
                        <Image
                            src={blog.image}
                            alt={blog.title} fill className="object-cover rounded z-10 h-full w-full bg-[#ebedf0]"
                            placeholder="blur"
                            blurDataURL="/media/placeholder.jpg"
                        />
                    </div>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>
                    <div className="blog-btm flex justify-between items-center mt-8">
                        <div className="flex gap-x-4">
                            {
                                prevPost.length !== 0 ? <Link href={`/blogs/${prevPost[0].slug}`}><button title="Previous Post" className="post-nav"><span className="sm:block hidden">Previous Post</span><i class="bi bi-chevron-left sm:hidden block"></i></button></Link> : null
                            }
                            
                            {
                                nextPost.length !== 0 ? <Link href={`/blogs/${nextPost[0].slug}`}><button title="Next Post" className="post-nav"><span className="sm:block hidden">Next Post</span><i class="bi bi-chevron-right sm:hidden block"></i></button></Link> : null
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
                    <CommentSection blogId={blog.id} blogTitle={blog.title} />


                </div>
                <div className="latest-blogs xl:w-3/12 lg:w-4/12 w-full">
                    <h2 className="text-center">Latest Blogs</h2>
                    <ul className="latest-list grid lg:grid-cols-1 grid-cols-2 md:gap-5 gap-3 mt-4">
                        {latestBlogs.map((item, idx) => (
                            <Link key={idx} href={`/blogs/${item.slug}`} className="block">
                                <div className="bg-gray-100 p-4 recent-card h-full  rounded shadow hover:shadow-lg transition-all">
                                    <div className="relative img-box h-full">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover z-10 h-full w-full bg-[#ebedf0] rounded"
                                            placeholder="blur"
                                            blurDataURL="/media/placeholder.jpg"
                                        />
                                    </div>
                                    <div className="text-side">
                                        <h3 className="font-semibold lg:text-md sm:text-sm text-xs">{item.title}</h3>
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
