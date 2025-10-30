import { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/auth', '/api', '/dashboard', '/profile'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

export default robots
