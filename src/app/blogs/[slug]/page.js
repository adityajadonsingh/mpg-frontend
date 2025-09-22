// app/blogs/[slug]/page.js

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogs, getBlogsCategory } from "@/lib/api/blogs";
import Breadcrum from "@/components/Breadcrum";
import CopyUrlButton from "@/components/blog/CopyUrlButton";
import FacebookShareButton from "@/components/blog/FacebookShareButton";
import XShareButton from "@/components/blog/XShareButton";
import LinkedInShareButton from "@/components/blog/LinkedInShareButton";
import CommentSection from "@/components/blog/CommentSection";
import SchemaInjector from "@/components/SchemaInjector";

export async function generateStaticParams() {
  const allBlogs = await getAllBlogs();
  return allBlogs.blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogSinglePage({ params }) {
  const allBlogs = await getAllBlogs();
  const blogCategories = await getBlogsCategory();
  const pageParams = await params;
  const pageSlug = pageParams.slug;
  const blog = allBlogs.blogs.find((b) => b.slug === pageSlug);
  if (!blog) return notFound();
  const sortedBlogs = [...allBlogs.blogs].sort(
    (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
  );
  const latestBlogs = sortedBlogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 5);

  const prevPost = allBlogs.blogs.filter((b) => b.id === blog.id - 1);
  const nextPost = allBlogs.blogs.filter((b) => b.id === blog.id + 1);
  const slugPath = [
    { slug_name: "Blogs", slug: "/blogs" },
    { slug_name: blog.breadcrumb, slug: `/blogs/${blog.slug}` },
  ];
  const commonSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mpgstone.com/blogs/${blog.slug}/`,
    },
    headline: blog.title,
    description: blog.meta_description,
    image: blog.meta_image,
    author: {
      "@type": "Person",
      name: "Jaya Tripathi",
      url: "https://mpgstone.com/author/jaya_tripathi/",
    },
    publisher: {
      "@type": "Organization",
      name: "MPG Stone",
      logo: {
        "@type": "ImageObject",
        url: "https://mpgstone.com/media/logo.svg",
      },
    },
    datePublished: new Date(blog.date_posted).toISOString(),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mpgstone.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://mpgstone.com/blogs/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `https://mpgstone.com/blogs/${blog.slug}/`,
      },
    ],
  };

  const normalizeSchema = (schema) =>
    schema?.schema_json ? schema : { schema_json: schema };

  // collect everything (breadcrumb first if you like)
  const rawSchemas = [
    breadcrumbSchema,
    commonSchema,
    ...(Array.isArray(blog.schema_markup) ? blog.schema_markup : []),
  ];

  // dedupe by JSON string and wrap as `{ schema_json: ... }`
  const safeSchemas = Array.from(
    new Map(
      rawSchemas.map((schema) => {
        const normalized = normalizeSchema(schema);
        return [JSON.stringify(normalized.schema_json), normalized];
      })
    ).values()
  );

  return (
    <>
      <section className="single-blog lg:w-full md:w-11/12 w-full mx-auto wrapper md:my-8 my-5 gap-y-6 lg:flex-nowrap justify-center flex-wrap">
        <div className="blog-content xl:w-8/12 lg:w-9/12 w-full  xl:pr-26 lg:pr-10">
          <div className="single-blog-breadcrum xl:mb-4 mb-2">
            <Breadcrum path_arr={slugPath} />
          </div>
          <h1 className="xl:text-4xl lg:text-3xl text-2xl font-bold xl:mb-4 mb-3">
            {blog.title}
          </h1>
          <ul className="md:text-sm text-xs  text-gray-600 mb-6 flex flex-wrap gap-x-2 justify-start items-center">
            <li className="inline-block">
              <i className="bi bi-calendar3 mr-1 text-[#f36c23]"></i>{" "}
              {new Date(blog.date_posted).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </li>
            <li>|</li>
            <li className="inline-block">
              <i className="bi bi-person-circle mr-1 text-[#f36c23]"></i>{" "}
              <Link className="hover:text-[#f36c23]" href={"/author/jaya_tripathi/"}>Jaya Tripathi</Link>
            </li>
            <li>|</li>
            <li>
              <span className="text-[#f36c23] font-medium">Category</span> :{" "}
              <Link
                className="hover:text-[#f36c23]"
                href={`/blog-category/${blog.category.slug}`}
              >
                {blog.category.name}
              </Link>
            </li>
          </ul>
          <div className="relative blog-main-img w-full xl:h-[500px] lg:h-[450px] md:h-[420px] sm:h-[350px] h-[280px] mb-6">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="sm:object-cover object-contain rounded z-10 h-full w-full bg-[#ebedf0]"
              placeholder="blur"
              blurDataURL="/media/placeholder.jpg"
            />
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
          <div className="sm:mt-4 mt-2 sm:p-8 p-4 border-1 rounded-md border-[#777a80]">
            <h5 className="sm:text-xl text-lg font-semibold text-[#f36c23]">
              About The Author
            </h5>
            <hr className="my-3" />
            <p className="sm:text-base text-sm">
              <strong>Jaya Tripathi</strong> is a seasoned content writer and
              editor with over a decade of experience in the stone and real
              estate industries. As a leading voice at MPG Stone, she shares
              insights on installment processes, project insights, design
              guides, and much more
            </p>
          </div>

          <div className="blog-btm flex justify-between items-center mt-8">
            <div className="flex gap-x-4">
              {prevPost.length !== 0 ? (
                <Link href={`/blogs/${prevPost[0].slug}`}>
                  <button title="Previous Post" className="post-nav">
                    <span className="sm:block hidden">Previous Post</span>
                    <i className="bi bi-chevron-left sm:hidden block"></i>
                  </button>
                </Link>
              ) : null}

              {nextPost.length !== 0 ? (
                <Link href={`/blogs/${nextPost[0].slug}`}>
                  <button title="Next Post" className="post-nav">
                    <span className="sm:block hidden">Next Post</span>
                    <i className="bi bi-chevron-right sm:hidden block"></i>
                  </button>
                </Link>
              ) : null}
            </div>
            <div className="share">
              <ul className="flex gap-x-3">
                <li>
                  <CopyUrlButton />
                </li>
                <li>
                  <FacebookShareButton />
                </li>
                <li>
                  <XShareButton text="Read this awesome blog:" />
                </li>
                <li>
                  <LinkedInShareButton />
                </li>
              </ul>
            </div>
          </div>
          <CommentSection blogId={blog.id} blogTitle={blog.title} />
        </div>
        <div className=" xl:w-3/12 lg:w-4/12 w-full relative">
          <div className="sticky top-28">
            <div className="latest-blogs mb-5">
              <h2 className="text-center">Blog Categories</h2>
              <ul className="mt-3">
                {blogCategories.map((item, idx) => (
                  <li key={idx + "-blog-category"} className=" mb-3">
                    <Link
                      className="flex px-3 justify-between"
                      href={`/blog-category/${item.category_slug}/`}
                    >
                      <span>{item.category_name}</span>
                      <span>{item.blog_count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="latest-blogs">
              <h2 className="text-center">Latest Blogs</h2>
              <ul className="latest-list grid lg:grid-cols-1 grid-cols-2 md:gap-5 gap-3 mt-4">
                {latestBlogs.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/blogs/${item.slug}`}
                    className="block"
                  >
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
                        <h3 className="font-semibold lg:text-md sm:text-sm text-xs">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <SchemaInjector schemas={safeSchemas} />
    </>
  );
}

export async function generateMetadata({ params }) {
  const allBlogs = await getAllBlogs();
  const pageSlug = await params.slug;
  const blog = allBlogs.blogs.find((b) => b.slug === pageSlug);

  return {
    title: blog.meta_title,
    description: blog.meta_description,
    keywords: blog.meta_keywords,
    openGraph: {
      title: blog.og_title || blog.meta_title,
      description: blog.og_descriptions || blog.meta_description,
      url: blog.canonical_url,
      images: blog.meta_image,
      type: "website",
      locale: "en_US",
      siteName: "MPG Stone",
    },
    twitter: {
      title: blog.twitter_title || blog.meta_title,
      description: blog.twitter_description || blog.meta_description,
      images: blog.meta_image,
    },
    alternates: {
      canonical: blog.canonical_url || "",
    },
    robots: blog.robots_tag,
  };
}
