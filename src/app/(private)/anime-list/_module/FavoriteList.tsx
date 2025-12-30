import Image from 'next/image'
import React from 'react'

import { PosterCard } from '@/components/module'

import { ApiBaseModel, ShortAnimeTitle } from '@/types/anime.types'
import { Result } from '@/types/fetch.types'
import { ImageType } from '@/types/image.types'

import CarouselWrapper from './CarouselWrapper'

interface Props {
  data: Result<ApiBaseModel<ShortAnimeTitle[]>>
}

const FavoriteList: React.FC<Props> = (props) => {
  const { data } = props

  if (data.type == 'error') {
    return 'При попытке загрузить список избранного произошла ошибка.'
  }

  const list = data.data
  if (list.results.length == 0) {
    return (
      <section className='mb-3 flex flex-col gap-3 md:mb-6'>
        <span className='font-[Roboto_Flex] text-[20px] leading-[32px] font-extrabold md:mt-0 md:text-[24px] md:leading-[41px] lg:text-[32px]'>
          Избранные аниме
        </span>
        <div className='flex w-full flex-col items-center py-4'>
          <Image
            src='/images/mascot-idk.PNG'
            alt='Маскот LDA Team'
            width={300}
            height={300}
          />
          <span className='mb-1 text-center text-xl font-normal md:mb-2 lg:text-2xl'>
            В избранном пока пусто.
          </span>
          <span className='text-foreground/50 max-w-[420px] text-center text-pretty'>
            Сохраняйте аниме, которые хотите посмотреть позже или пересмотреть
            снова.
          </span>
        </div>
      </section>
    )
  }

  return (
    <section className='mb-3 flex flex-col gap-3 md:mb-6'>
      <span className='font-[Roboto_Flex] text-[20px] leading-[32px] font-extrabold md:mt-0 md:text-[24px] md:leading-[41px] lg:text-[32px]'>
        Избранные аниме
      </span>
      <CarouselWrapper>
        <ul className='flex gap-4'>
          {list.results.map((anime) => {
            const imageUrl = anime.poster?.filePath
              ? `${process.env.NEXT_PUBLIC_ASSETS_URL}/api/files/image/${anime.poster.filePath}`
              : '/images/placeholder-image.jpg'

            const poster = anime.poster
              ? {
                  ...anime.poster,
                  url: imageUrl,
                  previewForEpisodeId: anime.poster?.previewForEpisodeId ?? '4',
                  altText: anime.poster?.altText ?? '',
                  id: anime.poster?.id ?? 'default-id',
                  filePath: anime.poster?.filePath ?? '',
                  imageType: '4' as ImageType,
                }
              : {
                  id: 'default-id',
                  url: imageUrl,
                  filePath: '',
                  altText: '',
                  previewForEpisodeId: '4',
                  imageType: '4' as ImageType,
                }

            return (
              <li
                key={anime.id}
                className='relative z-0 box-content min-h-[400px] min-w-[288px]'
              >
                <PosterCard {...anime} poster={poster} />
              </li>
            )
          })}
        </ul>
      </CarouselWrapper>
    </section>
  )
}

export default FavoriteList
