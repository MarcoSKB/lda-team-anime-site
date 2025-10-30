import Link from 'next/link'

import { Tag } from '@/components/ui'

import { ShortAnimeTitle } from '@/types/anime.types'

import PosterCardAction from './PosterCardAction'

interface Props extends Omit<ShortAnimeTitle, 'poster'> {}

const PosterCardInfo: React.FC<Props> = (props) => {
  const { id, slug, name, description, rating, genres } = props

  return (
    <div className='absolute top-0 left-0 z-10 h-full w-full bg-[rgba(0,2,13,0.8)] px-4 pt-2 pb-4 opacity-0 transition duration-200 ease-in-out group-focus-within:opacity-100 group-hover:opacity-100'>
      <Link
        href={`/catalog/${slug}`}
        className='hover:text-accent line-clamp-2 inline-flex w-full scroll-mt-10 py-2 text-xl leading-[26px] font-semibold text-white transition ease-in-out'
      >
        {name}
      </Link>
      <div className='mb-1 text-sm text-white opacity-80'>Оценка: {rating}</div>
      <div className='mb-3 flex w-full max-w-[256px] gap-2 overflow-x-auto'>
        {genres.slice(0, 4).map((tag) => (
          <Tag key={tag.id} className='text-[#9095A1]'>
            {tag.name}
          </Tag>
        ))}
      </div>
      <div className='line-clamp-5 w-full cursor-default text-sm leading-[23px] text-pretty text-white opacity-80 select-none'>
        {description}
      </div>
      <PosterCardAction id={id} slug={slug} />
    </div>
  )
}

export default PosterCardInfo
