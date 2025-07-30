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
  `.trim();

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
