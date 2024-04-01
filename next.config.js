/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  reactStrictMode: true,
  swcMinify: true,
  
  staticPageGenerationTimeout: 1000,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vangogh.teespring.com',
        port: '',
        pathname: '/v3/image/**',
      },
      {
        protocol: 'https',
        hostname: 'mockup-api.teespring.com',
        port: '',
        pathname: '/v3/image/**',
      },
    ],
  },
}

module.exports = nextConfig
