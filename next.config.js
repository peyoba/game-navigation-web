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
  output: 'standalone', // 适用于Cloudflare Pages
  distDir: 'dist', // 指定构建输出目录
  experimental: {
    // 启用一些实验性功能以优化部署
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client']
  }
}

module.exports = nextConfig 