/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@vercel/blob']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.picsum.photos',
      },
    ],
  },
};

export default nextConfig;
