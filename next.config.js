/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? process.env.NEXT_PUBLIC_BASE_PATH || '' : '';

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // 对于静态导出需要设置为true
  },
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  output: 'export', // 静态导出
};

module.exports = nextConfig;
