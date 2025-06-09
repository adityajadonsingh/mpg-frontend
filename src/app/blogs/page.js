import { getAllBlogs } from "@/lib/api/blogs";
import { notFound } from "next/navigation";
import AllProductsClientPage from "@/components/product/AllProductsClientPage";

export default async function BlogsDefaultPage() {
  const pageIndex = 1;
  const perPage = 2;

  const allBlogs = await getAllBlogs(); 
  console.log(allBlogs.blogs)
//   if (!allProducts || allProducts.length === 0) return notFound();

  const totalPages = Math.ceil(allBlogs.length / perPage);
  const start = (pageIndex - 1) * perPage;
  const end = start + perPage;
  const paginatedBlogs = allBlogs.blogs.slice(start, end);

  const slugPath = [
    { slug_name: "Blogs", slug: "/blogs/" },
  ];

  return (
    <></>
  );
}
