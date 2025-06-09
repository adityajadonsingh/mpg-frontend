import Breadcrum from "@/components/Breadcrum";
import MiniBanner from "@/components/MiniBanner";
import { getAllBlogs } from "@/lib/api/blogs";
import Link from "next/link";
import Image from "next/image";

export default async function BlogsDefaultPage() {
    const pageIndex = 1;
    const perPage = 2;

    const allBlogs = await getAllBlogs();
    console.log(allBlogs.blogs)

    const totalPages = Math.ceil(allBlogs.length / perPage);
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
                            allBlogs.blogs.map((blog, idx) => {
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
                                                Author Name |{" "}
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
        </>
    );
}
