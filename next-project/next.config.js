/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'de9mvi9pqgvkh.cloudfront.net',
        pathname: '**',
      },
    ],
  },
  output: 'standalone',
  compiler: {
    styledComponents: true,
    // removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: [
      '@tanstack/react-query',
      '@tanstack/react-query-devtools',
      'next-auth'
    ],
  }
};

module.exports = nextConfig;