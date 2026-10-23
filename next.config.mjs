/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: '**.cloudflarestorage.com' },
      // Add the tenant's custom R2 public domain here, e.g.:
      // { protocol: 'https', hostname: 'media.littlestars.in' },
    ],
  },
};

export default nextConfig;
