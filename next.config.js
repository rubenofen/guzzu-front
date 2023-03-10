/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL
  },
  images: {
    domains: ['dqpzvxknjobdx.cloudfront.net'],
    minimumCacheTTL: 60
  }
}

module.exports = nextConfig
