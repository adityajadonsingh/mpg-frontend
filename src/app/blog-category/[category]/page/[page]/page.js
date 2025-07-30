import MiniBanner from "@/components/MiniBanner";
import Link from "next/link";
import Image from "next/image";
import { getAllBlogs, getBlogsCategory } from "@/lib/api/blogs";
import { notFound } from "next/navigation";



// export async function generateMetadata({ params }) {
//   const { category, page } = params;
//   const categories = await getBlogsCategory();
//   const cat = categories.find((c) => c.category_slug === category);
//   if (!cat) return notFound();

//   return {
//     title: `${cat.category_name} Blogs - Page ${page} | MPG Stone`,
//     description: `Explore blogs under the category ${cat.category_name}, page ${page}.`,

//   };
// }

export default async function BlogCategoryPage({ params }) {
  const { category, page } = await params;
  const pageIndex = parseInt(page);
  const perPage = 9;

  if (isNaN(pageIndex) || pageIndex < 2) return notFound();

  const allBlogs = await getAllBlogs();
 
  const categoryBlogs = allBlogs.blogs.filter(
    (blog) => blog.category?.slug === category
  );
  if (categoryBlogs.length === 0) return notFound();

  const totalPages = Math.ceil(categoryBlogs.length / perPage);
  if (pageIndex > totalPages) return notFound();

  const start = (pageIndex - 1) * perPage;
  const end = start + perPage;
  const paginatedBlogs = categoryBlogs.slice(start, end);

  return (
    <>
      <MiniBanner
        bg_img={"/media/blogs_banner.webp"}
        pageName={`${category.replace(/-/g, " ")} Blogs`}
      />

      <section className="blog-page">
        <div className="wrapper">
          <div className="grid lg:grid-cols-3 gap-5">
            {paginatedBlogs.map((blog, idx) => (
              <Link key={`cat-blog-${idx}`} href={`/blogs/${blog.slug}`} className="block">
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
                      <span className="text-gray-600">
                        {new Date(blog.date_posted).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
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
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination text-center pt-10 mb-6 space-x-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <Link
                  key={idx}
                  href={
                    idx === 0
                      ? `/blog-category/${category}`
                      : `/blog-category/${category}/page/${idx + 1}`
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
        </div>
      </section>
    </>
  );
}
