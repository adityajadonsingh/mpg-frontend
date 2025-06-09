/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    domains: ['img.freepik.com'],
    remotePatterns: [
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
