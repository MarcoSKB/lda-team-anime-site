import { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/auth',
          '/api',
          '/dashboard',
          '/profile',
          '/banned',
          '/404',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

export default robots
