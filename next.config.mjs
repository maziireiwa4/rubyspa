/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Bắt buộc để Next.js xuất trang tĩnh
  images: {
    unoptimized: true, // Tránh lỗi tối ưu ảnh trên Cloudflare
  },
};

export default nextConfig;
