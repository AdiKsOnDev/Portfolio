/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  output: 'export',
  trailingSlash: true,
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig
