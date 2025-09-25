/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "html.kodesolution.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mpg-backend-production.up.railway.app",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "mpg-backend-production.up.railway.app",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "backend.mpgstone.com",
        pathname: "/media/**",
      },
    ],
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["swiper"],
  },

  async redirects() {
    return [
      {
        source: "/product-category/:category/page/1",
        destination: "/product-category/:category/",
        permanent: true,
      },
      {
        source: "/blogs/page/1",
        destination: "/blogs/",
        permanent: true,
      },
      {
        source: "/products/page/1",
        destination: "/products/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
