import Link from 'next/link'

import { OngoingTitle } from '@/types/anime.types'

import { Tag } from '@/components/ui'

import { truncateText } from '@/utils/string'

import PosterCardAction from './PosterCardAction'

interface Props extends Omit<OngoingTitle, 'img'> {}

const PosterCardInfo: React.FC<Props> = (props) => {
  const { id, slug, title, description, rating, tags } = props

  return (
    <div className='absolute top-0 left-0 z-10 h-full w-full bg-[rgba(0,2,13,0.8)] px-4 pt-2 pb-4 opacity-0 transition duration-200 ease-in-out group-focus-within:opacity-100 group-hover:opacity-100'>
      <Link
        href={`/catalog/${slug}`}
        className='hover:text-accent inline-flex w-full scroll-mt-10 py-2 text-xl leading-[26px] font-semibold text-white transition ease-in-out'
      >
        {truncateText(title, 43)}
      </Link>
      <div className='mb-1 text-sm text-white opacity-80'>Оценка: {rating}</div>
      <div className='mb-3 flex w-full max-w-[256px] gap-2 overflow-x-auto'>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className='w-full cursor-default text-sm leading-[23px] text-pretty text-white opacity-80 select-none'>
        {truncateText(description, 150)}
      </div>
      <PosterCardAction id={id} slug={slug} />
    </div>
  )
}

export default PosterCardInfo
