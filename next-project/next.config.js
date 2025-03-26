/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['de9mvi9pqgvkh.cloudfront.net'],
  },
  // Configurações atualizadas para Next.js 14:
  output: 'standalone',
  swcMinify: true,
  compiler: {
    styledComponents: true, // Remova se não usar
  }
};

module.exports = nextConfig;