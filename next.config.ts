import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.vidstack.io',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'cover.imglib.info',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        search: '',
      },
    ],
  },
}

export default nextConfig
