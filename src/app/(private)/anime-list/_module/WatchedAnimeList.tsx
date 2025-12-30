import React from 'react'

import { Card } from '@/components/module'
import { LinkButton } from '@/components/ui'

import { ApiBaseModel, ShortAnimeTitle } from '@/types/anime.types'
import { Result } from '@/types/fetch.types'
import { ANIME_STATUS_TITLE } from '@/utils/global-vars'

import CarouselWrapper from './CarouselWrapper'

interface Props {
  data: Result<ApiBaseModel<ShortAnimeTitle[]>>
}

const WatchedList: React.FC<Props> = (props) => {
  const { data } = props

  if (data.type == 'error') {
    return 'При попытке загрузить список просмотренного произошла ошибка.'
  }

  const list = data.data
  if (list.results.length == 0) {
    return (
      <section className='flex flex-col gap-3'>
        <span className='font-[Roboto_Flex] text-[20px] font-extrabold md:mt-0 md:text-[24px] md:leading-[41px] lg:text-[32px]'>
          Просмотренные аниме
        </span>
        <div className='flex w-full flex-col gap-2 py-4'>
          <span className='text-foreground/50 max-w-[500px] text-pretty'>
            Сохраняйте просмотренные тайтлы, чтобы отслеживать, что вы уже
            посмотрели. Добавляйте аниме в список после просмотра, и оно
            появится здесь.
          </span>
          <LinkButton href='/catalog' intent='primary' className='max-w-fit'>
            Начать просмотр
          </LinkButton>
        </div>
      </section>
    )
  }

  return (
    <section className='flex flex-col gap-2'>
      <span className='font-[Roboto_Flex] text-[20px] font-extrabold md:mt-0 md:text-[24px] md:leading-[41px] lg:text-[32px]'>
        Просмотренные аниме
      </span>
      <CarouselWrapper>
        <ul className='flex gap-4'>
          {list.results.map((anime) => {
            const imageUrl = anime.poster?.filePath
              ? `${process.env.NEXT_PUBLIC_ASSETS_URL}/api/files/image/${anime.poster.filePath}`
              : '/images/placeholder-image.jpg'

            return (
              <li key={anime.id} className='w-full max-w-[220px]'>
                <Card
                  img={imageUrl}
                  voiceoverType={anime.currentVoiceoverType}
                  format={ANIME_STATUS_TITLE[anime.currentTitleStatus]}
                  tags={anime.genres}
                  slug={anime.slug}
                  title={anime.name}
                />
              </li>
            )
          })}
        </ul>
      </CarouselWrapper>
    </section>
  )
}

export default WatchedList
