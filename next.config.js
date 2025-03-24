/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'play-lh.googleusercontent.com',
      'img.itch.zone',
      'assets.nintendo.com'
    ]
  }
}

module.exports = nextConfig 