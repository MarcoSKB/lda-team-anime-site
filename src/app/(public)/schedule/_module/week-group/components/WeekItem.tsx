import Image from 'next/image'
import Link from 'next/link'

import { truncateText } from '@/utils/string'

interface Props {
  title: string
  slug: string
  img: string
  season: number
  episode: number
}

const WeekItem: React.FC<Props> = (props) => {
  const { title, slug, img, season, episode } = props

  return (
    <div className='relative z-0 flex min-h-[152px] max-w-[420px] min-w-[164px] flex-[33%] overflow-hidden rounded-md bg-black'>
      <Link
        href={`/catalog/${slug}`}
        title={`Перейти к аниме ${title}`}
        className='group flex w-full flex-col items-center justify-center gap-1 px-3 py-2'
      >
        <span className='group-hover:text-accent w-full text-center leading-[20px] font-semibold text-balance text-white transition ease-in-out'>
          {truncateText(title, 46)}
        </span>
        <span className='text-center text-sm leading-[18px] text-white opacity-80 transition ease-in-out group-hover:opacity-100'>{`${season}\u00A0Сезон - ${episode}\u00A0Эпизод`}</span>
      </Link>
      <Image
        fill
        sizes='420px'
        src={img}
        className='z-[-1] h-auto w-auto object-cover opacity-30'
        alt={`Постер аниме ${title}`}
      />
    </div>
  )
}

export default WeekItem
