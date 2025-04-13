type PostTypes = 'Новость' | 'Обновление' | 'Статья' | 'Рекомендация'

export interface PostPreview {
  id: number
  slug: string
  type: PostTypes
  title: string
  description: string
  createdAt: string
}
