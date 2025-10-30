import Image from 'next/image'
import Link from 'next/link'

import { Tag } from '@/components/ui'

import { CatalogTitle } from '@/types/anime.types'
import { ANIME_VOICEOVER_TYPE } from '@/utils/global-vars'
import { truncateText } from '@/utils/string'

interface Props extends Omit<CatalogTitle, 'id'> {}

const Card: React.FC<Props> = (props) => {
  const { slug, title, img, voiceoverType, format } = props

  const imageUrl = img ?? '/images/placeholder-image.jpg'

  return (
    <Link
      href={`/catalog/${slug}`}
      className='group dark:border-secondary flex h-full w-full max-w-[220px] scroll-mt-10 flex-col gap-2 overflow-hidden rounded-lg border-1 border-solid border-[#d5d9e2] p-2 drop-shadow-xl dark:drop-shadow-none'
    >
      <div
        className='relative z-0 aspect-[202/264] h-full w-full'
        title='Перейти к просмотру тайтла'
      >
        <Image
          fill
          src={imageUrl}
          alt={`Постер аниме ${title}`}
          sizes='243px'
          className='z-0 rounded-[4px] object-cover transition ease-in-out group-hover:opacity-70'
        />
        <Tag
          intent='primary'
          className='pointer-events-none absolute top-1 left-1 md:top-2 md:left-[-6px]'
        >
          {format}
        </Tag>
      </div>
      <div className='flex h-full flex-col gap-1 overflow-hidden px-0.5'>
        <span
          className='group-hover:text-accent text-foreground mb-auto line-clamp-2 scroll-mt-10 text-sm leading-4.5 font-normal text-balance antialiased transition-colors ease-in-out'
          title='Перейти к просмотру тайтла'
        >
          {truncateText(title, 45, false)}
        </span>
        <span className='text-[12px] font-thin opacity-50'>
          {ANIME_VOICEOVER_TYPE[voiceoverType]}
        </span>
      </div>
    </Link>
  )
}

export default Card
