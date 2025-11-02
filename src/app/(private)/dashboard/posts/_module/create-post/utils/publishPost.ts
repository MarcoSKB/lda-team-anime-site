import { uploadImage } from '@/actions/image'
import { createPost, editPost } from '@/actions/post'
import { PostTypes } from '@/types/post.types'
import { ASSET_BASE } from '@/utils/global-vars'

export const publishPost = async (
  imageMapRef: Map<string, File>,
  {
    title,
    postType,
    description,
    content,
  }: {
    title: string
    postType: PostTypes
    description: string
    content: string
  },
) => {
  const postRes = await createPost({
    title,
    postType,
    description,
    content,
  })
  if (postRes.type == 'error')
    throw new Error(postRes.message || 'Не удалось создать пост')
  const post = postRes.data

  const mapping: Record<string, string> = {}

  for (const [localUrl, file] of imageMapRef.entries()) {
    const result = await uploadImage(file, file.name, '6', post.id)
    if (result.type === 'ok') {
      mapping[localUrl] =
        `${ASSET_BASE}/api/files/image/${result.data.filePath}`
    }
  }

  let updatedContent = content
  for (const [localUrl, realUrl] of Object.entries(mapping)) {
    updatedContent = updatedContent.replaceAll(localUrl, realUrl)
  }

  const updatePostRes = await editPost({
    id: post.id,
    title,
    postType,
    description,
    content: updatedContent,
  })

  if (updatePostRes.type == 'error')
    throw new Error(updatePostRes.message || 'Не удалось обновить пост')
  imageMapRef.clear()
}
