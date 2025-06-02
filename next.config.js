/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  
  // Optimize for production
  swcMinify: true,
  
  // Image optimization for Docker
  images: {
    unoptimized: true,
  },
  
  // DISABLE static page generation to avoid SSR errors
  generateEtags: false,
  
  // Force dynamic rendering
  experimental: {
    forceSwcTransforms: true,
  },
  
  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig