/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dqpzvxknjobdx.cloudfront.net'],
    minimumCacheTTL: 60
  }
}

module.exports = nextConfig
