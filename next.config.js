/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['cdn.media.amplience.net', 'i1.adis.ws'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
