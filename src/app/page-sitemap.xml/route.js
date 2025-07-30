// app/static-sitemap.xml/route.js
import { NextResponse } from "next/server";

const siteUrl = "https://mpgstone.com";

export async function GET() {
  const staticPages = [
    "",
    "/about-us/",
    "/contact-us/",
    "/blogs/",
    "/products/",
    "/product-category/",
    "/product-catalogue/",
    "/privacy-policy/",
    "/terms-and-conditions/",
  ];

  const urls = staticPages.map(path => {
    return `<url>
  <loc>${siteUrl}${path}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
</url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
