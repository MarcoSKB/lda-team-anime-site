type PostTypes = 'Новость' | 'Обновление' | 'Статья' | 'Рекомендация'

export interface PostPreview {
  id: number
  slug: string
  type: PostTypes
  title: string
  description: string
  createdAt: string
}

export interface Post {
  id: number
  slug: string
  title: string
  type: PostTypes
  description: string
  author: string
  createdAt: string
  content: string
}
