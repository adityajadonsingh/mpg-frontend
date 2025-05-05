/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
        ],
      },      
  };

export default nextConfig;
