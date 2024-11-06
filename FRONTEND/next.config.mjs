// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: 'loose', // Allow compatibility with ESM imports in some packages
  },
};

export default nextConfig;
