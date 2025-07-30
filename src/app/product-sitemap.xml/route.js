import { getAllProducts } from "@/lib/api/products";


export async function GET() {
    const baseUrl = "https://mpgstone.com";

    const allProducts  = await getAllProducts("all", "all");


    

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allProducts
            .map(
                (product) => `
      <url>
        <loc>${baseUrl}/product-category/${product.category.replace(/ /g, "-").toLowerCase()}/</loc>
        <lastmod>${new Date(product.updated_at.replace(' ', 'T')).toISOString()}</lastmod>
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
