import Image from 'next/image'

import { Card } from '@/components/module'

import { ApiBaseModel, ShortAnimeTitle } from '@/types/anime.types'
import { Result } from '@/types/fetch.types'
import { ANIME_STATUS_TITLE } from '@/utils/global-vars'

import LoadMore from '../load-more/LoadMore'

interface Props {
  data: Result<ApiBaseModel<ShortAnimeTitle[]>>
}

const TitleList: React.FC<Props> = async ({ data }) => {
  if (data.type == 'error') {
    return 'Что то пошло не так'
  }
  const catalogList = data.data.results

  if (catalogList.length == 0) {
    return (
      <div className='flex w-full flex-col items-center py-4'>
        <Image
          src='/images/mascot-idk.PNG'
          alt='Маскот LDA Team'
          width={300}
          height={300}
        />
        <span className='mb-1 text-center text-xl font-normal md:mb-2 lg:text-2xl'>
          Ничего не нашлось.
        </span>
        <span className='text-foreground/50 max-w-[320px] text-center text-balance'>
          Кажется, по заданным условиям нет подходящих тайтлов.
        </span>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col gap-x-1 gap-y-1 md:gap-x-2 md:gap-y-5 lg:gap-x-4 lg:gap-y-6'>
      <ul className='grid h-fit w-full grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-x-1 gap-y-1 md:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] md:gap-x-2 md:gap-y-5 lg:gap-x-4 lg:gap-y-6'>
        {catalogList.map((anime) => {
          const imageUrl = anime.poster?.url ?? '/images/placeholder-image.jpg'
          return (
            <li key={anime.id} className='max-w-[220px]'>
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

        <LoadMore initiaHasMore={data.data.count >= 20} />
      </ul>
    </div>
  )
}

export default TitleList
