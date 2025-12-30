import Image from 'next/image'

import { Container, ReadMore, Tag } from '@/components/ui'

import { AnimeTitle } from '@/types/anime.types'

import FavoriteButton from './FavoriteButton'
import RatingButton from './RatingButton'

interface Props {
  data: AnimeTitle
}

const TitleInfo: React.FC<Props> = ({ data: animeData }) => {
  const imageUrl =
    animeData.images.find((image) => image.imageType == '4')?.url ??
    '/images/placeholder-image.jpg'

  return (
    <>
      <h1 className='sr-only'>
        Смотреть аниме {animeData.name} в хорошем качестве
      </h1>
      <Container className='mb-8 flex flex-col gap-6 pt-4 md:flex-row md:pt-0'>
        <div className='mx-auto flex w-1/2 max-w-[260px] min-w-[190px] flex-col gap-3 md:mx-0 md:w-auto'>
          <Image
            src={imageUrl}
            width={190}
            height={263}
            className='aspect-190/263 h-auto w-auto min-w-[190px] rounded-md object-cover'
            alt={`Постер аниме ${animeData.name}`}
          />
          <div className='flex items-start gap-2'>
            <FavoriteButton titleId={animeData.id} />
            <RatingButton titleId={animeData.id} rating={animeData.rating} />
          </div>
        </div>
        <div className='flex w-full flex-col gap-3'>
          <h2 className='text-foreground max-w-[70%] font-[Roboto_Flex] text-[32px] leading-9 font-extrabold text-balance'>
            {animeData.name}
          </h2>
          <div className='before:from-background relative w-fit before:pointer-events-none before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-gradient-to-l before:to-[rgba(255,255,255,0)] before:to-10% before:content-[""]'>
            <div className='flex max-w-[400px] gap-1.5 overflow-x-auto pr-5'>
              {animeData.genres.map(({ id, name }) => (
                <Tag key={id} className='py-0.5'>
                  {name}
                </Tag>
              ))}
            </div>
          </div>
          <ReadMore
            maxLength={300}
            className='text-foreground max-w-[700px] scroll-mt-10 overflow-x-hidden text-sm leading-[22px] font-light text-balance md:text-base md:leading-[26px] dark:opacity-90'
          >
            {animeData.description}
          </ReadMore>
        </div>
      </Container>
    </>
  )
}

export default TitleInfo
