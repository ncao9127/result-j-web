/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig;
