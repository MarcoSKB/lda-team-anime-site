import { uploadImage } from '@/actions/image'
import { editPost } from '@/actions/post'
import { PostTypes } from '@/types/post.types'
import { ASSET_BASE } from '@/utils/global-vars'

export const editPostWithImage = async (
  imageMapRef: Map<string, File>,
  {
    id,
    title,
    postType,
    description,
    content,
  }: {
    id: string
    title: string
    postType: PostTypes
    description: string
    content: string
  },
) => {
  const mapping: Record<string, string> = {}
  for (const [localUrl, file] of imageMapRef.entries()) {
    const result = await uploadImage(file, file.name, '6', id)
    if (result.type === 'ok') {
      mapping[localUrl] =
        `${ASSET_BASE}/api/files/image/${result.data.filePath}`
    }
  }

  let updatedContent = content
  for (const [localUrl, realUrl] of Object.entries(mapping)) {
    updatedContent = updatedContent.replaceAll(localUrl, realUrl)
  }

  const postRes = await editPost({
    id,
    title,
    postType,
    description,
    content: updatedContent,
  })
  if (postRes.type == 'error')
    throw new Error(postRes.message || 'Не удалось обновить пост')
  imageMapRef.clear()
}
