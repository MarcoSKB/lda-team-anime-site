import { Metadata } from 'next'
import { Suspense } from 'react'

import { CommentEditor } from '@/components/module'
import { Container } from '@/components/ui'

import { getAnimeTitle } from '@/actions/anime'

import { CommentSection, PlayerSection, TitleInfo } from './_module'
import CommentSectionSkeleton from './_module/comment-section/CommentSectionSkeleton'

interface Props {
  params: Promise<{ slug: string }>
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const res = await getAnimeTitle(slug)

  if (res.type == 'error') {
    return {
      title: 'Аниме | LDA Team',
      description: 'Не удалось загрузить информацию об аниме.',
    }
  }
  const title = res.data.name
  const description =
    res.data.description?.slice(0, 160) ||
    `Смотрите ${res.data.name} онлайн в хорошем качестве на LDA Team.`
  const image = res.data.images.find((image) => image.imageType == '4')

  return {
    title,
    description,
    openGraph: {
      type: 'video.movie',
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/catalog/${res.data.slug}`,
      siteName: 'LDA Team',
      images: image
        ? {
            url: image.url,
            width: 1200,
            height: 630,
            alt: image.altText,
          }
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image
        ? {
            url: image.url,
            width: 1200,
            height: 630,
            alt: image.altText,
          }
        : undefined,
    },
  }
}

const page: React.FC<Props> = async ({ params }) => {
  const { slug } = await params
  const res = await getAnimeTitle(slug)

  if (res.type == 'error') {
    return (
      <div className='container mx-auto py-10'>
        Произошла ошибка. Повторите повторите попытку
      </div>
    )
  }
  const animeData = res.data

  return (
    <div className='md:pt-[72px]'>
      <TitleInfo data={animeData} />
      <PlayerSection data={animeData} />
      <Suspense
        fallback={
          <Container className='flex flex-col gap-5 py-8'>
            <CommentEditor isLoggedIn={true} titleId={animeData.id} />
            <CommentSectionSkeleton />
          </Container>
        }
      >
        <CommentSection titleId={animeData.id} slug={animeData.slug} />
      </Suspense>
    </div>
  )
}

export default page
