/**
 * Тип изображения:
 * - '1' → TitleImage
 * - '2' → EpisodePreview
 * - '3' → UserAvatar
 * - '4' → Poster
 * - '5' → Banner
 * - '6' → PostImage
 */

export type ImageType = '1' | '2' | '3' | '4' | '5' | '6'

export type ImageBase = {
  id: string
  filePath: string
  url: string
  altText: string
  imageType: ImageType
}

export type ImageResponseMap = {
  '1': ImageBase & { titleId: string }
  '2': ImageBase & { episodeId: string }
  '3': ImageBase & { userId: string }
  '4': ImageBase & { previewForEpisodeId: string }
  '5': ImageBase & { titleId: string }
  '6': ImageBase & { postId: string }
}

export type ImageResponse = ImageResponseMap[ImageType]
