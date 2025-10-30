/**
 * Тип постов:
 * - '0' → News
 * - '1' → Update
 * - '2' → Article
 * - '3' → Recomendation
 */
export type PostTypes = 0 | 1 | 2 | 3

export interface PostPreview {
  id: string
  slug: string
  type: PostTypes
  title: string
  description: string
  createdAt: string
}

export interface Post {
  id: string
  slug: string
  title: string
  postType: PostTypes
  description: string
  createdAt: string
  content: string
  likesCount: number
  dislikesCount: number
}
