/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose', // Allow compatibility with ESM imports in some packages
  },
  images: {
    domains: ['res.cloudinary.com'], // Add the allowed image domains here
  },
};

export default nextConfig;
