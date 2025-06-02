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
  
  // DISABLE all static optimization
  distDir: '.next',
  generateEtags: false,
  
  // Force all pages to be dynamic
  experimental: {
    isrMemoryCacheSize: 0, // Disable ISR cache
  },
  
  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig