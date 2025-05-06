import Image from 'next/image'
import Link from 'next/link'

import { CatalogTitle } from '@/types/anime.types'

import { Tag } from '@/components/ui'

import { truncateText } from '@/utils/string'

interface Props extends Omit<CatalogTitle, 'id'> {}

const Card: React.FC<Props> = (props) => {
  const { slug, title, img, voiceoverType, format, tags } = props

  return (
    <div className='dark:border-secondary flex h-full w-full flex-col overflow-hidden rounded-lg border-1 border-solid border-[#d5d9e2] drop-shadow-xl dark:drop-shadow-none'>
      <Link
        href={`/catalog/${slug}`}
        className='group relative z-0 h-full min-h-[189px] w-full min-w-[132px] md:min-h-[264px] md:min-w-[198px]'
        title='Перейти к просмотру тайтла'
      >
        <Image
          src={img}
          alt={`Постер аниме ${title}`}
          fill
          sizes='243px'
          className='object-cover transition ease-in-out group-hover:opacity-70'
        />
        <Tag
          intent='primary'
          className='pointer-events-none absolute top-1 right-1 md:top-2 md:right-2'
        >
          {voiceoverType}
        </Tag>
      </Link>
      <div className='bg-secondary flex h-full flex-col gap-1 px-2 py-2 md:gap-2.5'>
        <Link
          href={`/catalog/${slug}`}
          className='hover:text-accent text-foreground mb-auto text-sm leading-5 text-balance transition-colors ease-in-out md:mb-0 md:text-base'
          title='Перейти к просмотру тайтла'
        >
          {truncateText(title, 45)}
        </Link>
        <div className='mb-auto hidden w-full max-w-[182px] gap-1 overflow-x-auto md:flex'>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <span className='text-[12px] opacity-50'>{format}</span>
      </div>
    </div>
  )
}

export default Card
