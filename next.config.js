/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'play-lh.googleusercontent.com',
      'img.itch.zone',
      'assets.nintendo.com'
    ],
    unoptimized: true, // 为Cloudflare Pages部署优化图片处理
  },
  output: 'standalone',
  distDir: 'dist', // 指定构建输出目录
}

module.exports = nextConfig