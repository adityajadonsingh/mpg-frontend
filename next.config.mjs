/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'html.kodesolution.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mpg-backend-production.up.railway.app',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'mpg-backend-production.up.railway.app',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.mpgstone.co.uk',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
