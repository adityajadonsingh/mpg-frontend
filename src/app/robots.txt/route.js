// app/robots.txt/route.js
import { NextResponse } from "next/server";

export async function GET() {
    const siteUrl = "https://mpgstone.com";

    const content = `
User-agent: *
Allow: /
Disallow: /blog-category/
Disallow: /*?page=
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /server/
Disallow: /media/

Sitemap: ${siteUrl}/sitemap.xml
  `.trim();

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
