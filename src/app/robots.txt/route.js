// app/robots.txt/route.js
import { NextResponse } from "next/server";

export async function GET() {
    const siteUrl = "https://mpgstone.com";

    const content = `
User-agent: *
Disallow: /blog-category/
Disallow: /*?page=
Disallow: /admin/

Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/page-sitemap.xml
Sitemap: ${siteUrl}/blogs-sitemap.xml
Sitemap: ${siteUrl}/product-sitemap.xml
Sitemap: ${siteUrl}/product_category-sitemap.xml
  `.trim();

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
