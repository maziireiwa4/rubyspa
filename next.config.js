/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.optimization.splitChunks.maxSize = 250000; // Giới hạn mỗi chunk < 250KB
    return config;
  },
};

module.exports = nextConfig;
