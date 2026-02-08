/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // 👈 هذا يسمح بجلب الصور من Sanity
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // (اختياري) للصور المؤقتة إذا كنت تستخدمها
      }
    ],
  },
};

export default nextConfig;