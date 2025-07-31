import { getAllBlogs } from "@/lib/api/blogs";

export async function GET() {
  const baseUrl = "https://mpgstone.com";

  const allBlogs = await getAllBlogs();
  const blogs = allBlogs.blogs;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/url-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${blogs
      .map(
        (blog) => `
    <url>
      <loc>${baseUrl}/blogs/${blog.slug}/</loc>
      <lastmod>${new Date(blog.updated_at.replace(" ", "T")).toISOString()}</lastmod>
<priority>1.00</priority>    
      </url>`
      )
      .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
