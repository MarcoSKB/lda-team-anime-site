/**
 * Тип реакции:
 * - 'null' → Нет оценки
 * - 'true' → Лайк
 * - 'false' → Дизлайк
 */
type reactionType = null | true | false

interface Reply {
  id: string
  userId: string
  userAvatar?: string
  nickname: string
  text: string
  // titleId: string,
  // parentId?: string
  createdAt: string
  likes: number
  userReactionType: reactionType
  dislikes: number
}

export interface CommentType {
  id: string
  userId: string
  userAvatar?: string
  nickname: string
  text: string
  titleId: string
  createdAt: string
  likes: number
  dislikes: number
  parentId?: string
  replies: Reply[]
  userReactionType: reactionType
  isOptimistic?: boolean
}
