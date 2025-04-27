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
    ],
  },
}

export default nextConfig
