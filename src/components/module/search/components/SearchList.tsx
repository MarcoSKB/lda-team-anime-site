'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { searchAnime } from '@/actions/anime'
import useServerAction from '@/hooks/useServerAction'
import { ShortAnimeTitle } from '@/types/anime.types'

interface Props {
  clearSearchValue: () => void
  handleSearchState: (state: boolean) => void
}

const SearchList: React.FC<Props> = ({
  clearSearchValue,
  handleSearchState,
}) => {
  const [results, setResults] = useState<ShortAnimeTitle[]>([])
  const search = useSearchParams().get('search')
  const { data, isLoading } = useServerAction(searchAnime, search)

  useEffect(() => {
    if (data?.type == 'ok') {
      setResults(data.data.results)
    }
  }, [data])

  if (search == null) {
    return null
  }

  if (isLoading) {
    return (
      <div className='flex max-h-[calc(100svh-42px)] flex-col gap-2 overflow-y-auto md:max-h-[calc(100svh-160px)]'>
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className='group bg-background flex h-full max-h-[113px] gap-2 rounded-sm border border-[#e2e7f1] px-1.5 py-1.5 transition md:gap-2.5 md:px-2 dark:border-none'
          >
            <div className='bg-foreground/50 dark:bg-secondary h-[100px] w-[84px] animate-pulse rounded-sm object-cover' />
            <div className='flex w-full flex-col gap-1.5'>
              <div className='flex flex-col justify-between md:flex-row md:gap-2'>
                <div className='bg-foreground/50 dark:bg-secondary h-[16px] w-[60%] animate-pulse rounded-sm md:h-[18px]' />
                <div className='bg-foreground/50 dark:bg-secondary w-[80px] animate-pulse rounded-sm text-[12px] sm:h-[16px]' />
              </div>
              <div className='bg-foreground/50 dark:bg-secondary h-[51px] w-full max-w-[461px] animate-pulse rounded-sm' />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (results.length == 0)
    return (
      <div className='flex items-center justify-center gap-2 px-2 py-2.5'>
        <Image
          src='/images/cat-with-lens.png'
          alt='Кот с лупой'
          width={84}
          height={100}
        />
        <span className='text-balance'>
          Увы, аниме с таким <br /> названием не найдено.
        </span>
      </div>
    )

  return (
    <div className='flex max-h-[calc(100svh-42px)] flex-col gap-2 overflow-y-auto md:max-h-[calc(100svh-160px)]'>
      {results.map((anime) => (
        <Link
          key={anime.id}
          href={`/catalog/${anime.slug}`}
          title={`Перейти к аниме ${anime.name}`}
          onClick={() => {
            clearSearchValue()
            handleSearchState(false)
          }}
          className='group bg-background flex gap-2 rounded-sm border border-[#e2e7f1] px-1.5 py-1.5 transition md:gap-2.5 md:px-2 dark:border-none'
        >
          <Image
            src={
              anime.poster?.url
                ? `${anime.poster.url}`
                : '/images/placeholder-image.jpg'
            }
            width={84}
            height={100}
            alt='Превью аниме'
            className='rounded-md object-cover'
          />
          <div className='flex w-full flex-col gap-1.5'>
            <div className='flex flex-col justify-between md:flex-row md:gap-2'>
              <span className='group-hover:text-accent text-base font-semibold transition-colors ease-in-out md:text-lg md:leading-[26px]'>
                {anime.name}
              </span>
              <span className='min-w-fit text-[12px] text-nowrap opacity-80 sm:text-sm'>
                Оценка:&nbsp;{anime.rating}
              </span>
            </div>
            <span className='line-clamp-3 max-w-[461px] text-[12px] opacity-80 sm:text-sm'>
              {anime.description}
            </span>
          </div>
        </Link>
      ))}
      <Link
        href={`/catalog`}
        className='bg-background text-link hover:text-foreground w-full rounded-sm px-2 py-1.5 text-center text-base transition-colors ease-in-out'
      >
        В каталог
      </Link>
    </div>
  )
}

export default SearchList
