
import { getAllCategories } from "@/lib/api/categories";

export async function GET() {
    const baseUrl = "https://mpgstone.com";

    const allCategories  = await getAllCategories();

    

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allCategories
            .map(
                (category) => `
      <url>
        <loc>${baseUrl}/product-category/${category.slug}/</loc>
        <lastmod>${new Date(category.updated_at.replace(' ', 'T')).toISOString()}</lastmod>
      </url>
    `
            )
            .join("")}
  </urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
