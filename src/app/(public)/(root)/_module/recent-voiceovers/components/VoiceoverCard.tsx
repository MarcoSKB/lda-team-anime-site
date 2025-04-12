import Image from 'next/image'
import Link from 'next/link'

import { RecentVoiceover } from '@/types/anime.types'
import { formatDistanceToNowStrict } from 'date-fns'
import { ru } from 'date-fns/locale/ru'

import { Tag } from '@/components/ui'

import { truncateText } from '@/utils/string'

const VoiceoverCard: React.FC<RecentVoiceover> = (props) => {
  const { slug, title, description, img, createdAt, episode, tags } = props

  const date = formatDistanceToNowStrict(new Date(createdAt), {
    addSuffix: true,
    locale: ru,
  })

  return (
    <li className='bg-secondary relative z-0 flex gap-3 overflow-hidden rounded-md border-1 border-solid border-[#e2e7f1] p-2.5 pb-9 drop-shadow-xl md:gap-6 md:p-3 md:pb-2 dark:border-none dark:drop-shadow-none'>
      <Link
        href={`/catalog/${slug}`}
        title='Перейти к странице с аниме'
        className='relative z-0 h-[154px] min-w-[100px] overflow-hidden rounded-md md:min-w-[112px]'
      >
        <Image
          src={img}
          height={154}
          width={112}
          className='absolute top-0 left-0 h-full w-full object-cover'
          alt='Постер аниме'
        />
        <Tag
          intent='primary'
          className='absolute top-1 right-1 md:top-1.5 md:right-1.5'
        >
          {episode} Эпизод
        </Tag>
      </Link>
      <div className='flex flex-col'>
        <div className='mb-1.5 flex items-start justify-between gap-3'>
          <Link
            href={`/catalog/${slug}`}
            title='Перейти к странице с аниме'
            className='text-foreground hover:text-accent text-base leading-6 text-balance transition ease-in-out md:text-lg'
          >
            {truncateText(title, 60)}
          </Link>
          <Tag
            intent='secondary'
            className='absolute bottom-1.5 left-2 text-nowrap md:static'
          >
            {date}
          </Tag>
        </div>
        <div className='before:from-secondary relative mb-3 w-fit before:pointer-events-none before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-gradient-to-l before:to-[rgba(255,255,255,0)] before:to-10% before:content-[""]'>
          <div className='flex w-[216px] gap-1.5 overflow-x-auto'>
            {tags.map((tag) => (
              <Tag key={tag} className='py-0.5'>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className='text-[13px] font-light text-balance opacity-80 md:text-sm md:leading-[20px]'>
          {truncateText(description, 96)}
        </div>
      </div>
    </li>
  )
}

export default VoiceoverCard
