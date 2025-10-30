import { MetadataRoute } from 'next'

import { getCatalogList } from '@/actions/anime'
import { getPostPreviewList } from '@/actions/post'
import { ShortAnimeTitle } from '@/types/anime.types'
import { Post } from '@/types/post.types'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  const anime = await getCatalogList({
    take: '1000',
  })
  const posts = await getPostPreviewList(0, 1000, false)

  const allAnime: ShortAnimeTitle[] = []
  const allPosts: Post[] = []

  if (anime.type == 'ok') allAnime.push(...anime.data.results)
  if (posts.type == 'ok') allPosts.push(...posts.data.results)

  const animePages: MetadataRoute.Sitemap = allAnime.map((anime) => ({
    url: `${baseUrl}/catalog/${anime.slug}`,
    lastModified: anime.createdAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const postPages: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.createdAt,
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/signin`,
      lastModified: new Date(),
      priority: 0.3,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      priority: 0.3,
    },
  ]

  return [...staticPages, ...animePages, ...postPages]
}

export default sitemap
